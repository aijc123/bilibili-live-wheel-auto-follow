import type { CustomChatEvent } from './custom-chat-events'

export const CUSTOM_CHAT_MAX_MESSAGES = 220
export const CUSTOM_CHAT_MAX_RENDER_BATCH = 36
export const CUSTOM_CHAT_MAX_RENDER_QUEUE = CUSTOM_CHAT_MAX_MESSAGES

export function trimRenderQueue(queue: CustomChatEvent[]): void {
  while (queue.length > CUSTOM_CHAT_MAX_RENDER_QUEUE) queue.shift()
}

export function takeRenderBatch(queue: CustomChatEvent[]): CustomChatEvent[] {
  return queue.splice(0, CUSTOM_CHAT_MAX_RENDER_BATCH)
}

export function shouldAnimateRenderBatch(batchSize: number): boolean {
  return batchSize <= 12
}

export function visibleRenderMessages(
  messages: CustomChatEvent[],
  matches: (message: CustomChatEvent) => boolean
): CustomChatEvent[] {
  return messages.filter(matches).slice(-CUSTOM_CHAT_MAX_MESSAGES)
}
