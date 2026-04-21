import { ensureRoomId, getCsrfToken, getDedeUid, sendDanmaku, setRandomDanmakuColor } from './api'
import { subscribeDanmaku } from './danmaku-stream'
import { appendLog } from './log'
import { applyReplacements } from './replacement'
import {
  autoBlendCooldownSec,
  autoBlendEnabled,
  autoBlendIncludeReply,
  autoBlendMinOccurrences,
  autoBlendSendCount,
  autoBlendUniqueUsers,
  autoBlendUseReplacements,
  autoBlendWindowSec,
  isEmoticonUnique,
  maxLength,
  msgSendInterval,
  randomChar,
  randomColor,
  randomInterval,
} from './store'
import { addRandomCharacter, trimText } from './utils'

interface Counter {
  uniqueUids: Set<string>
  totalCount: number
  firstSeenAt: number
  lastSeenAt: number
}

const counters = new Map<string, Counter>()
const cooldowns = new Map<string, number>()

let unsubscribe: (() => void) | null = null
let cleanupTimer: ReturnType<typeof setInterval> | null = null
let myUid: string | null = null
let isSending = false

function pruneExpired(now: number): void {
  const windowMs = autoBlendWindowSec.value * 1000
  for (const [k, c] of counters) {
    if (now - c.lastSeenAt > windowMs) counters.delete(k)
  }
  const cooldownMs = autoBlendCooldownSec.value * 1000
  for (const [k, t] of cooldowns) {
    if (now - t > cooldownMs) cooldowns.delete(k)
  }
}

function recordDanmaku(rawText: string, uid: string | null, isReply: boolean): void {
  if (!autoBlendEnabled.value) return
  const text = rawText.trim()
  if (!text) return
  if (isReply && !autoBlendIncludeReply.value) return

  // Always exclude self by uid; if uid extraction failed, fall back to cooldown.
  if (uid && myUid && uid === myUid) return

  if (cooldowns.has(text)) return

  const now = Date.now()
  pruneExpired(now)

  let c = counters.get(text)
  if (!c) {
    c = { uniqueUids: new Set(), totalCount: 0, firstSeenAt: now, lastSeenAt: now }
    counters.set(text, c)
  }
  c.totalCount++
  c.lastSeenAt = now
  if (uid) c.uniqueUids.add(uid)

  // Require BOTH x distinct users AND z total occurrences within the window.
  // Fallback: when uid extraction fails for every event we use totalCount as
  // a stand-in for unique users, so the feature still works on an unfamiliar
  // DOM (worst case: counts a single spammer as one "user").
  const effectiveUniqueUsers = c.uniqueUids.size > 0 ? c.uniqueUids.size : c.totalCount
  if (effectiveUniqueUsers >= autoBlendUniqueUsers.value && c.totalCount >= autoBlendMinOccurrences.value) {
    void triggerSend(text, c.uniqueUids.size, c.totalCount)
  }
}

async function triggerSend(originalText: string, uniqueUsers: number, totalCount: number): Promise<void> {
  // Claim the slot atomically. If another send is in-flight we bail WITHOUT
  // mutating cooldowns/counters so the trend keeps accumulating and naturally
  // re-evaluates threshold on the next matching danmaku once we're free.
  if (isSending) return
  isSending = true
  cooldowns.set(originalText, Date.now())
  counters.delete(originalText)
  try {
    const csrfToken = getCsrfToken()
    if (!csrfToken) {
      appendLog('🚲 自动融入：未登录，跳过')
      return
    }
    const roomId = await ensureRoomId()

    const isEmote = isEmoticonUnique(originalText)
    const useReplacements = autoBlendUseReplacements.value && !isEmote
    const replaced = useReplacements ? applyReplacements(originalText) : originalText
    const wasReplaced = useReplacements && originalText !== replaced

    // Cooldown the post-replacement text too, so our own outbound message
    // doesn't immediately re-trigger if uid filtering misses.
    if (wasReplaced) cooldowns.set(replaced, Date.now())

    const repeatCount = Math.max(1, autoBlendSendCount.value)
    const senderInfo = uniqueUsers > 0 ? `${uniqueUsers} 人 / ${totalCount} 条` : `${totalCount} 条`
    appendLog(`🚲 自动融入触发 (${senderInfo}): ${originalText}`)

    for (let i = 0; i < repeatCount; i++) {
      let toSend = replaced
      if (!isEmote && randomChar.value) toSend = addRandomCharacter(toSend)
      if (!isEmote) toSend = trimText(toSend, maxLength.value)[0] ?? toSend

      if (!isEmote && randomColor.value) {
        await setRandomDanmakuColor(roomId, csrfToken)
      }

      const result = await sendDanmaku(toSend, roomId, csrfToken)
      const baseLabel = result.isEmoticon ? '自动融入(表情)' : '自动融入'
      const label = repeatCount > 1 ? `${baseLabel} [${i + 1}/${repeatCount}]` : baseLabel
      const display = wasReplaced || toSend !== originalText ? `${originalText} → ${toSend}` : toSend
      appendLog(result, label, display)

      if (i < repeatCount - 1) {
        const interval = msgSendInterval.value * 1000
        const offset = randomInterval.value ? Math.floor(Math.random() * 500) : 0
        await new Promise(r => setTimeout(r, Math.max(0, interval - offset)))
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    appendLog(`🔴 自动融入出错：${msg}`)
  } finally {
    isSending = false
  }
}

export function startAutoBlend(): void {
  if (unsubscribe) return
  myUid = getDedeUid() ?? null

  unsubscribe = subscribeDanmaku({
    onMessage: ev => recordDanmaku(ev.text, ev.uid, ev.isReply),
  })

  if (cleanupTimer === null) {
    cleanupTimer = setInterval(() => pruneExpired(Date.now()), 5000)
  }
}

export function stopAutoBlend(): void {
  if (cleanupTimer) {
    clearInterval(cleanupTimer)
    cleanupTimer = null
  }
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  counters.clear()
  cooldowns.clear()
}
