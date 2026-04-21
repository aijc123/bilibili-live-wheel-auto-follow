import { ensureRoomId, getCsrfToken, getDedeUid, setRandomDanmakuColor } from './api'
import { subscribeDanmaku } from './danmaku-stream'
import { appendLog } from './log'
import { applyReplacements } from './replacement'
import { enqueueDanmaku, SendPriority } from './send-queue'
import {
  autoParrotCooldownSec,
  autoParrotEnabled,
  autoParrotIncludeReply,
  autoParrotRoutineIntervalSec,
  autoParrotThreshold,
  autoParrotUseReplacements,
  autoParrotWindowSec,
  isEmoticonUnique,
  maxLength,
  randomChar,
  randomColor,
} from './store'
import { addRandomCharacter, trimText } from './utils'

// message → array of arrival timestamps within the rolling window
const trendMap = new Map<string, number[]>()

// Global hard cooldown: while Date.now() < cooldownUntil, all incoming danmaku are
// discarded (not counted). Engaged after every successful send to prevent echo stacking.
let cooldownUntil = 0

let unsubscribe: (() => void) | null = null
let cleanupTimer: ReturnType<typeof setInterval> | null = null
let routineTimer: ReturnType<typeof setInterval> | null = null
let myUid: string | null = null
let isSending = false

function pruneExpired(now: number): void {
  const windowMs = autoParrotWindowSec.value * 1000
  for (const [k, timestamps] of trendMap) {
    const fresh = timestamps.filter(t => now - t <= windowMs)
    if (fresh.length === 0) {
      trendMap.delete(k)
    } else {
      trendMap.set(k, fresh)
    }
  }
}

function recordDanmaku(rawText: string, uid: string | null, isReply: boolean): void {
  if (!autoParrotEnabled.value) return

  const now = Date.now()
  if (now < cooldownUntil) return

  const text = rawText.trim()
  if (!text) return
  if (isReply && !autoParrotIncludeReply.value) return

  // Always exclude self to prevent positive feedback loops.
  if (uid && myUid && uid === myUid) return

  pruneExpired(now)

  const timestamps = trendMap.get(text) ?? []
  timestamps.push(now)
  trendMap.set(text, timestamps)

  // Immediate trigger: catch the wave the moment threshold is crossed.
  if (timestamps.length >= autoParrotThreshold.value) {
    void triggerSend(text, 'burst')
  }
}

function routineTimerTick(): void {
  if (!autoParrotEnabled.value) return
  const now = Date.now()
  if (now < cooldownUntil) return

  pruneExpired(now)

  // Collect candidates that meet the burst threshold.
  const threshold = autoParrotThreshold.value
  const candidates: Array<[string, number]> = []
  for (const [text, timestamps] of trendMap) {
    if (timestamps.length >= threshold) {
      candidates.push([text, timestamps.length])
    }
  }
  if (candidates.length === 0) return

  // Weighted random choice (Monte Carlo sampling): W_i = count_i / sum_counts
  const totalWeight = candidates.reduce((s, [, c]) => s + c, 0)
  let r = Math.random() * totalWeight
  let chosen = candidates[candidates.length - 1][0]
  for (const [text, count] of candidates) {
    r -= count
    if (r <= 0) {
      chosen = text
      break
    }
  }

  void triggerSend(chosen, 'routine')
}

async function triggerSend(originalText: string, reason: string): Promise<void> {
  // Claim the slot atomically. If a send is already in-flight, bail without
  // engaging cooldown so the trend keeps accumulating.
  if (isSending) return
  isSending = true

  // Engage cooldown up front and wipe pending data so nothing accumulates
  // during the freeze and re-fires the instant it ends.
  cooldownUntil = Date.now() + autoParrotCooldownSec.value * 1000
  trendMap.clear()

  try {
    const csrfToken = getCsrfToken()
    if (!csrfToken) {
      appendLog('🦜 自动鹦鹉：未登录，跳过')
      return
    }
    const roomId = await ensureRoomId()

    const isEmote = isEmoticonUnique(originalText)
    const useReplacements = autoParrotUseReplacements.value && !isEmote
    const replaced = useReplacements ? applyReplacements(originalText) : originalText
    const wasReplaced = useReplacements && originalText !== replaced

    const reasonLabel = reason === 'burst' ? '爆发' : '例行'
    appendLog(`🦜 自动鹦鹉触发 (${reasonLabel}): ${originalText}`)

    let toSend = replaced
    if (!isEmote && randomChar.value) toSend = addRandomCharacter(toSend)
    if (!isEmote) toSend = trimText(toSend, maxLength.value)[0] ?? toSend

    if (!isEmote && randomColor.value) {
      await setRandomDanmakuColor(roomId, csrfToken)
    }

    const result = await enqueueDanmaku(toSend, roomId, csrfToken, SendPriority.AUTO)
    const baseLabel = result.isEmoticon ? '自动鹦鹉(表情)' : '自动鹦鹉'
    const display = wasReplaced || toSend !== originalText ? `${originalText} → ${toSend}` : toSend
    appendLog(result, baseLabel, display)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    appendLog(`🔴 自动鹦鹉出错：${msg}`)
  } finally {
    isSending = false
  }
}

export function startAutoParrot(): void {
  if (unsubscribe) return
  myUid = getDedeUid() ?? null

  unsubscribe = subscribeDanmaku({
    onMessage: ev => recordDanmaku(ev.text, ev.uid, ev.isReply),
  })

  if (cleanupTimer === null) {
    cleanupTimer = setInterval(() => pruneExpired(Date.now()), 5000)
  }

  if (routineTimer === null) {
    routineTimer = setInterval(routineTimerTick, autoParrotRoutineIntervalSec.value * 1000)
  }
}

export function stopAutoParrot(): void {
  if (cleanupTimer) {
    clearInterval(cleanupTimer)
    cleanupTimer = null
  }
  if (routineTimer) {
    clearInterval(routineTimer)
    routineTimer = null
  }
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  trendMap.clear()
  cooldownUntil = 0
}
