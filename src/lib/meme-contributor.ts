import { appendLog } from './log'
import {
  enableMemeContribution,
  memeContributorCandidates,
  memeContributorSeenTexts,
} from './store'

const MAX_PER_HOUR = 5
const MAX_CANDIDATES = 15
const MAX_SEEN = 200
const MIN_RECURRENCE_GAP_MS = 10 * 60 * 1000 // 10 minutes between first and last trigger

// text → list of timestamps when 自动融入 fired for this text
const sessionMap = new Map<string, number[]>()

const nominationTimestamps: number[] = []

function passesQualityFilter(text: string): boolean {
  const len = text.length
  if (len < 4 || len > 30) return false
  if (/^\d+$/.test(text)) return false
  if ([...text].every(c => c === text[0])) return false
  if (/^[\p{P}\p{S}\s]+$/u.test(text)) return false
  return true
}

/**
 * Called by auto-blend on each successful send.
 * Records the trigger and nominates the text if it has recurred
 * across a long enough time span (genuine community meme signal).
 */
export function recordMemeCandidate(text: string): void {
  if (!enableMemeContribution.value) return
  if (!passesQualityFilter(text)) return

  const now = Date.now()
  const times = sessionMap.get(text) ?? []
  times.push(now)
  sessionMap.set(text, times)

  // Need at least 2 separate triggers with a 10-minute gap between first and last.
  // A phrase that keeps coming back across a stream is more meme-like than a one-wave spike.
  if (times.length < 2) return
  if (now - times[0] < MIN_RECURRENCE_GAP_MS) return

  if (memeContributorSeenTexts.value.includes(text)) return
  if (memeContributorCandidates.value.includes(text)) return

  // Hourly rate limit
  const oneHourAgo = now - 3_600_000
  const recentCount = nominationTimestamps.filter(t => t >= oneHourAgo).length
  if (recentCount >= MAX_PER_HOUR) return

  const candidates = [...memeContributorCandidates.value, text]
  memeContributorCandidates.value = candidates.length > MAX_CANDIDATES ? candidates.slice(-MAX_CANDIDATES) : candidates

  const seen = [...memeContributorSeenTexts.value, text]
  memeContributorSeenTexts.value = seen.length > MAX_SEEN ? seen.slice(-MAX_SEEN) : seen

  nominationTimestamps.push(now)

  appendLog(`[贡献者] 检测到高质量烂梗 "${text}"，已加入待贡献池`)
}

export function ignoreMemeCandidate(text: string): void {
  memeContributorCandidates.value = memeContributorCandidates.value.filter(c => c !== text)

  if (!memeContributorSeenTexts.value.includes(text)) {
    const seen = [...memeContributorSeenTexts.value, text]
    memeContributorSeenTexts.value = seen.length > MAX_SEEN ? seen.slice(-MAX_SEEN) : seen
  }
}

export function clearMemeSession(): void {
  sessionMap.clear()
}
