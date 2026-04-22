import { beforeEach, describe, expect, mock, test } from 'bun:test'

const gmStore = new Map<string, unknown>()

mock.module('$', () => ({
  GM_deleteValue: (key: string) => {
    gmStore.delete(key)
  },
  GM_getValue: <T>(key: string, defaultValue: T): T => (gmStore.has(key) ? (gmStore.get(key) as T) : defaultValue),
  GM_setValue: (key: string, value: unknown) => {
    gmStore.set(key, value)
  },
}))

const { buildReplacementMap, applyReplacements } = await import('../src/lib/replacement')
const { cachedRoomId, localGlobalRules, localRoomRules, remoteKeywords, replacementMap } = await import(
  '../src/lib/store'
)

describe('replacement', () => {
  beforeEach(() => {
    cachedRoomId.value = null
    localGlobalRules.value = []
    localRoomRules.value = {}
    remoteKeywords.value = null
    replacementMap.value = null
  })

  test('applies cached replacements repeatedly', () => {
    replacementMap.value = new Map([
      ['抽奖', '口令'],
      ['加群', '集合'],
    ])

    expect(applyReplacements('抽奖抽奖 加群')).toBe('口令口令 集合')
  })

  test('local room rules override local and remote rules', () => {
    cachedRoomId.value = 101
    remoteKeywords.value = {
      global: { keywords: { foo: 'remote-global' } },
      rooms: [{ room: '101', keywords: { foo: 'remote-room' } }],
    }
    localGlobalRules.value = [{ from: 'foo', to: 'local-global' }]
    localRoomRules.value = { 101: [{ from: 'foo', to: 'local-room' }] }

    buildReplacementMap()

    expect(applyReplacements('foo')).toBe('local-room')
  })
})
