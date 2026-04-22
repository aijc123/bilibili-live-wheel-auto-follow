import { VERSION } from './const'
import { describeRestrictionDuration, isAccountRestrictedError, isMutedError, isRateLimitError } from './moderation'
import { guardRoomEndpoint, guardRoomSyncKey } from './store'

type RiskEventKind =
  | 'send_failed'
  | 'rate_limited'
  | 'muted'
  | 'account_restricted'
  | 'login_missing'
  | 'queue_cancelled'
  | 'unknown'

type RiskEventSource = 'manual' | 'auto-send' | 'auto-blend' | 'stt' | 'ai-evasion' | 'system'
type RiskEventLevel = 'stop' | 'observe' | 'pass'

interface RiskEventInput {
  kind: RiskEventKind
  source: RiskEventSource
  level: RiskEventLevel
  roomId?: number | null
  errorCode?: number | null
  reason?: string
  advice?: string
}

function normalizeGuardRoomEndpoint(endpoint: string): string {
  return endpoint.trim().replace(/\/+$/, '')
}

export function classifyRiskEvent(error?: string, errorData?: unknown): Pick<RiskEventInput, 'kind' | 'level' | 'advice'> {
  if (isMutedError(error)) {
    return { kind: 'muted', level: 'stop', advice: `检测到房间禁言，先停车。禁言时长：${describeRestrictionDuration(error, errorData)}。` }
  }
  if (isAccountRestrictedError(error)) {
    return { kind: 'account_restricted', level: 'stop', advice: `检测到账号级风控，先停发。限制时长：${describeRestrictionDuration(error, errorData)}。` }
  }
  if (isRateLimitError(error)) {
    return { kind: 'rate_limited', level: 'observe', advice: '发送频率过快，先降频或暂停自动跟车。' }
  }
  return { kind: 'send_failed', level: 'observe', advice: '发送失败，建议看一眼房间状态和替换词。' }
}

export async function syncGuardRoomRiskEvent(input: RiskEventInput): Promise<void> {
  const endpoint = normalizeGuardRoomEndpoint(guardRoomEndpoint.value)
  const syncKey = guardRoomSyncKey.value.trim()
  if (!endpoint || !syncKey) return

  const payload = {
    eventId: `risk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    scriptVersion: VERSION,
    occurredAt: new Date().toISOString(),
    ...input,
    reason: input.reason?.slice(0, 500),
    advice: input.advice?.slice(0, 500),
  }

  await fetch(`${endpoint}/api/risk-events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-sync-key': syncKey,
    },
    body: JSON.stringify(payload),
  }).catch(() => undefined)
}
