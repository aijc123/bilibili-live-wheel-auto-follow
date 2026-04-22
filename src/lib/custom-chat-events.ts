export type CustomChatKind = 'danmaku' | 'gift' | 'superchat' | 'enter' | 'notice' | 'system'

export interface CustomChatEvent {
  id: string
  kind: CustomChatKind
  text: string
  sendText?: string
  uname: string
  uid: string | null
  time: string
  isReply: boolean
  source: 'dom' | 'ws' | 'local'
  badges: string[]
  avatarUrl?: string
  amount?: number
  rawCmd?: string
}

export type CustomChatEventHandler = (event: CustomChatEvent) => void

const handlers = new Set<CustomChatEventHandler>()

export function subscribeCustomChatEvents(handler: CustomChatEventHandler): () => void {
  handlers.add(handler)
  return () => handlers.delete(handler)
}

export function emitCustomChatEvent(event: CustomChatEvent): void {
  for (const handler of handlers) {
    handler(event)
  }
}

export function chatEventTime(ts = Date.now()): string {
  return new Date(ts).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}
