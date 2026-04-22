import { describe, expect, test } from 'bun:test'

import { detectTrend, type TrendEvent } from '../src/lib/auto-blend-trend'

describe('auto-blend trend detection', () => {
  test('does not trigger when messages in the window are below threshold', () => {
    const events: TrendEvent[] = [
      { text: '上车', ts: 1_000, uid: '1' },
      { text: '上车', ts: 2_000, uid: '2' },
    ]

    expect(detectTrend(events, 10_000, 3).shouldSend).toBe(false)
  })

  test('triggers when one text reaches threshold inside the window', () => {
    const events: TrendEvent[] = [
      { text: '冲', ts: 1_000, uid: '1' },
      { text: '冲', ts: 2_000, uid: '2' },
      { text: '冲', ts: 3_000, uid: '3' },
    ]

    const result = detectTrend(events, 10_000, 3)

    expect(result.shouldSend).toBe(true)
    expect(result.text).toBe('冲')
    expect(result.candidates[0]).toEqual({ text: '冲', totalCount: 3, uniqueUsers: 3 })
  })

  test('ignores expired events when counting a sudden burst', () => {
    const events: TrendEvent[] = [
      { text: '过期', ts: 1_000, uid: '1' },
      { text: '过期', ts: 2_000, uid: '2' },
      { text: '过期', ts: 20_000, uid: '3' },
    ]

    expect(detectTrend(events, 5_000, 2).shouldSend).toBe(false)
  })

  test('counts duplicate senders toward total but only once for unique users', () => {
    const events: TrendEvent[] = [
      { text: '复读', ts: 1_000, uid: '1' },
      { text: '复读', ts: 2_000, uid: '1' },
      { text: '复读', ts: 3_000, uid: '2' },
    ]

    const result = detectTrend(events, 10_000, 3)

    expect(result.shouldSend).toBe(true)
    expect(result.candidates[0]).toEqual({ text: '复读', totalCount: 3, uniqueUsers: 2 })
  })
})
