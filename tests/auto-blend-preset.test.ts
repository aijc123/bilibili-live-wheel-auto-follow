import { describe, expect, test } from 'bun:test'

import { getAutoBlendPresetValues } from '../src/lib/auto-blend-preset-config'

describe('auto-blend presets', () => {
  test('normal preset includes advanced safety defaults', () => {
    const normal = getAutoBlendPresetValues('normal')

    expect(normal.burstSettleMs).toBe(1500)
    expect(normal.rateLimitWindowMin).toBe(10)
    expect(normal.rateLimitStopThreshold).toBe(3)
  })

  test('hot preset is quicker but stops after fewer rate-limit hits', () => {
    const normal = getAutoBlendPresetValues('normal')
    const hot = getAutoBlendPresetValues('hot')

    expect(hot.burstSettleMs).toBeLessThan(normal.burstSettleMs)
    expect(hot.rateLimitStopThreshold).toBeLessThan(normal.rateLimitStopThreshold)
  })
})
