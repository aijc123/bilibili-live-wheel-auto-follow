/**
 * Global send queue: serializes ALL outbound danmaku across every feature
 * (auto-send, auto-blend, manual, memes, +1, STT, AI evasion) so they never
 * compete with each other against Bilibili's per-account rate limit.
 *
 * - One POST is in flight at any time.
 * - A hard floor of {@link HARD_MIN_GAP_MS} between sends acts as a safety
 *   net so a misconfigured per-source `msgSendInterval` can't burst.
 * - Higher-priority items are inserted ahead of lower-priority items still
 *   waiting in the queue. The in-flight send is never cancelled.
 * - Manual user actions also CANCEL pending AUTO items (auto-send,
 *   auto-blend) so user-initiated sends feel snappy. STT items are only
 *   reordered, never cancelled (cutting off live speech mid-flight would
 *   be jarring).
 */

import { type SendDanmakuResult, sendDanmaku } from './api'

/** Higher number = higher priority. Manual user actions jump ahead of automation. */
export const SendPriority = {
  AUTO: 0,
  STT: 1,
  MANUAL: 2,
} as const

export type SendPriority = (typeof SendPriority)[keyof typeof SendPriority]

interface QueueItem {
  message: string
  roomId: number
  csrfToken: string
  priority: SendPriority
  resolve: (result: SendDanmakuResult) => void
  reject: (err: unknown) => void
  cancelled: boolean
}

/**
 * Bilibili enforces ~1s between sends per account. 10ms safety on top.
 * This is the FLOOR — individual features may pace themselves slower (e.g.
 * 独轮车's `msgSendInterval`) and that local cadence still applies on top.
 */
const HARD_MIN_GAP_MS = 1010

const queue: QueueItem[] = []
let processing = false
let lastSendCompletedAt = 0

/**
 * Insert keeping FIFO order WITHIN a priority level, and ordering BETWEEN
 * priority levels (highest first). New item goes after all existing items
 * with priority >= its own.
 */
function insertByPriority(item: QueueItem): void {
  let i = queue.length
  while (i > 0 && queue[i - 1].priority < item.priority) i--
  queue.splice(i, 0, item)
}

async function processQueue(): Promise<void> {
  if (processing) return
  processing = true
  try {
    while (queue.length > 0) {
      while (queue.length > 0 && queue[0].cancelled) queue.shift()
      const item = queue.shift()
      if (!item) break

      if (lastSendCompletedAt > 0) {
        const sinceLast = Date.now() - lastSendCompletedAt
        if (sinceLast < HARD_MIN_GAP_MS) {
          await new Promise(r => setTimeout(r, HARD_MIN_GAP_MS - sinceLast))
        }
      }
      try {
        const result = await sendDanmaku(item.message, item.roomId, item.csrfToken)
        lastSendCompletedAt = Date.now()
        item.resolve(result)
      } catch (err) {
        lastSendCompletedAt = Date.now()
        item.reject(err)
      }
    }
  } finally {
    processing = false
  }
}

/**
 * Enqueue a danmaku send. Resolves with the same {@link SendDanmakuResult}
 * shape as raw {@link sendDanmaku}, so call sites only swap the function
 * name. The queue paces sends to never violate Bilibili's per-account rate
 * limit and prioritizes manual user actions over background automation.
 *
 * If a higher-priority send arrives and the caller's item is preempted
 * (only AUTO can be preempted, and only by MANUAL), the returned result
 * will have `cancelled: true` so the caller can render a skip log instead
 * of a fake send.
 */
export function enqueueDanmaku(
  message: string,
  roomId: number,
  csrfToken: string,
  priority: SendPriority = SendPriority.AUTO
): Promise<SendDanmakuResult> {
  return new Promise((resolve, reject) => {
    const item: QueueItem = { message, roomId, csrfToken, priority, resolve, reject, cancelled: false }
    insertByPriority(item)

    if (priority === SendPriority.MANUAL) {
      for (const q of queue) {
        if (q !== item && !q.cancelled && q.priority === SendPriority.AUTO) {
          q.cancelled = true
          q.resolve({
            success: false,
            cancelled: true,
            message: q.message,
            isEmoticon: false,
            error: 'preempted',
          })
        }
      }
    }

    void processQueue()
  })
}

/** Number of pending (non-cancelled) items. Useful for diagnostics. */
export function getQueueDepth(): number {
  return queue.reduce((n, q) => (q.cancelled ? n : n + 1), 0)
}

/**
 * Immediately cancels all queued AUTO-priority items. Called by cancelLoop()
 * so clicking 停车 drains the queue at once rather than waiting for each
 * in-queue item to be dequeued and discovered as stale.
 */
export function cancelPendingAuto(): void {
  for (const q of queue) {
    if (!q.cancelled && q.priority === SendPriority.AUTO) {
      q.cancelled = true
      q.resolve({
        success: false,
        cancelled: true,
        message: q.message,
        isEmoticon: false,
        error: 'loop-stopped',
      })
    }
  }
}
