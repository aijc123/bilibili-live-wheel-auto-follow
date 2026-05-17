/**
 * @deprecated 即将剥离到独立姊妹脚本 `bilibili-guild-companion`(Jobs 式 #9)。
 * 详细迁移计划: [docs/guard-room-spinoff-plan.md](../../docs/guard-room-spinoff-plan.md)。
 * 不要在这里新增功能,留待剥离后的姊妹脚本里加。
 */

import { signal } from '@preact/signals'

import { gmSignal } from './gm-signal'

export const guardRoomLiveDeskSessionId = gmSignal('guardRoomLiveDeskSessionId', '')
export const guardRoomLiveDeskHeartbeatSec = gmSignal('guardRoomLiveDeskHeartbeatSec', 30)
export const guardRoomCurrentRiskLevel = signal<'stop' | 'observe' | 'pass'>('pass')

export interface GuardRoomWatchlistRoomState {
  roomId: number
  anchorName: string
  anchorUid?: number | null
  medalName?: string | null
  source: 'medal' | 'follow' | 'both'
  liveStatus: 'live' | 'offline' | 'unknown'
}

export interface GuardRoomAppliedProfileState {
  dryRunDefault: boolean
  autoBlendEnabled: boolean
  heartbeatSec: number
  dwellSec: number
  hotMessageThreshold: number
  hotActiveUsersThreshold: number
  recommendationThreshold: number
  conservativeMode: 'safe' | 'normal' | 'hot'
  updatedAt?: string
}

export const guardRoomAgentConnected = signal(false)
export const guardRoomAgentStatusText = signal('未连接')
export const guardRoomAgentLastSyncAt = signal<number | null>(null)
export const guardRoomAgentWatchlistCount = signal(0)
export const guardRoomAgentLiveCount = signal(0)
export const guardRoomWatchlistRooms = signal<GuardRoomWatchlistRoomState[]>([])
export const guardRoomAppliedProfile = signal<GuardRoomAppliedProfileState | null>(null)
