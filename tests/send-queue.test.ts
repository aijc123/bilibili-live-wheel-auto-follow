import { describe, expect, mock, test } from 'bun:test'

const sent: string[] = []
let releaseFirstSend: (() => void) | null = null

const sendDanmaku = mock(async (message: string) => {
  sent.push(message)
  if (message === 'first-auto') {
    await new Promise<void>(resolve => {
      releaseFirstSend = resolve
    })
  }
  return { success: true, message, isEmoticon: false }
})

mock.module('$', () => ({
  GM_deleteValue: () => {},
  GM_getValue: <T>(_key: string, defaultValue: T): T => defaultValue,
  GM_info: { script: { version: 'test' } },
  GM_setValue: () => {},
}))

mock.module('../src/lib/api', () => ({ sendDanmaku }))

const { SendPriority, enqueueDanmaku, getQueueDepth } = await import('../src/lib/send-queue')

describe('send-queue', () => {
  test('manual sends cancel queued automation and jump ahead', async () => {
    const first = enqueueDanmaku('first-auto', 1, 'csrf', SendPriority.AUTO)
    await Promise.resolve()

    const queuedAuto = enqueueDanmaku('queued-auto', 1, 'csrf', SendPriority.AUTO)
    const manual = enqueueDanmaku('manual', 1, 'csrf', SendPriority.MANUAL)

    await expect(queuedAuto).resolves.toMatchObject({
      success: false,
      cancelled: true,
      error: 'preempted',
    })
    expect(getQueueDepth()).toBe(1)

    releaseFirstSend?.()

    await expect(first).resolves.toMatchObject({ success: true, message: 'first-auto' })
    await expect(manual).resolves.toMatchObject({ success: true, message: 'manual' })
    expect(sent).toEqual(['first-auto', 'manual'])
  })
})
