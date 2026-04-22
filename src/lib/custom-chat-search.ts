import type { CustomChatEvent, CustomChatKind } from './custom-chat-events'

export function kindLabel(kind: CustomChatKind): string {
  if (kind === 'danmaku') return '弹幕'
  if (kind === 'gift') return '礼物'
  if (kind === 'superchat') return 'SC'
  if (kind === 'guard') return '舰队'
  if (kind === 'redpacket') return '红包'
  if (kind === 'lottery') return '天选'
  if (kind === 'enter') return '进场'
  if (kind === 'follow') return '关注'
  if (kind === 'like') return '点赞'
  if (kind === 'share') return '分享'
  if (kind === 'notice') return '通知'
  if (kind === 'system') return '系统'
  return kind
}

export function messageMatchesCustomChatSearch(
  message: CustomChatEvent,
  query: string,
  isKindVisible: (kind: CustomChatKind) => boolean
): boolean {
  if (!isKindVisible(message.kind)) return false
  const tokens = splitQuery(query)
  for (const rawToken of tokens) {
    const negative = rawToken.startsWith('-')
    const token = negative ? rawToken.slice(1) : rawToken
    const matched = tokenMatches(message, token)
    if (negative ? matched : !matched) return false
  }
  return true
}

function splitQuery(query: string): string[] {
  return (
    query
      .match(/(?:[^\s"]+|"[^"]*")+/g)
      ?.map(token => token.replace(/^"|"$/g, '').trim())
      .filter(Boolean) ?? []
  )
}

function includesFolded(value: string, needle: string): boolean {
  return value.toLowerCase().includes(needle.toLowerCase())
}

function tokenMatches(message: CustomChatEvent, token: string): boolean {
  const normalized = token.trim()
  if (!normalized) return true
  const colon = normalized.indexOf(':')
  if (colon > 0) {
    const key = normalized.slice(0, colon).toLowerCase()
    const value = normalized.slice(colon + 1)
    if (key === 'user' || key === 'name' || key === 'from') return includesFolded(message.uname, value)
    if (key === 'uid') return includesFolded(message.uid ?? '', value)
    if (key === 'text' || key === 'msg') return includesFolded(message.text, value)
    if (key === 'kind' || key === 'type')
      return includesFolded(message.kind, value) || includesFolded(kindLabel(message.kind), value)
    if (key === 'source') return includesFolded(message.source, value)
    if (key === 'is') return value.toLowerCase() === 'reply' ? message.isReply : true
  }
  return includesFolded(message.text, normalized) || includesFolded(message.uname, normalized)
}
