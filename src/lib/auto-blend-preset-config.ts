export type AutoBlendPreset = 'safe' | 'normal' | 'hot'

export interface AutoBlendPresetConfig {
  label: string
  hint: string
  windowSec: number
  threshold: number
  cooldownSec: number
  routineIntervalSec: number
  minDistinctUsers: number
}

export interface AutoBlendPresetValues extends AutoBlendPresetConfig {
  includeReply: boolean
  requireDistinctUsers: boolean
  sendCount: number
  sendAllTrending: boolean
  useReplacements: boolean
}

export const AUTO_BLEND_PRESETS: Record<AutoBlendPreset, AutoBlendPresetConfig> = {
  safe: {
    label: '稳一点',
    hint: '少跟，适合挂机',
    windowSec: 25,
    threshold: 5,
    cooldownSec: 45,
    routineIntervalSec: 75,
    minDistinctUsers: 3,
  },
  normal: {
    label: '正常',
    hint: '推荐，比较克制',
    windowSec: 20,
    threshold: 4,
    cooldownSec: 35,
    routineIntervalSec: 60,
    minDistinctUsers: 3,
  },
  hot: {
    label: '热闹',
    hint: '跟得更快，但会自动刹车',
    windowSec: 15,
    threshold: 3,
    cooldownSec: 20,
    routineIntervalSec: 40,
    minDistinctUsers: 2,
  },
}

export function getAutoBlendPresetValues(preset: AutoBlendPreset): AutoBlendPresetValues {
  return {
    ...AUTO_BLEND_PRESETS[preset],
    includeReply: false,
    requireDistinctUsers: true,
    sendCount: 1,
    sendAllTrending: false,
    useReplacements: true,
  }
}
