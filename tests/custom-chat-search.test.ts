import { describe, expect, test } from 'bun:test'

import { customChatSearchHint } from '../src/lib/custom-chat-search'

describe('custom chat search hints', () => {
  test('suggests a nearby kind value', () => {
    expect(customChatSearchHint('kind:gfit')).toContain('kind:gift')
  })

  test('reports unknown search filters', () => {
    const hint = customChatSearchHint('knd:gift')

    expect(hint).toContain('knd:')
    expect(hint).toContain('kind:')
  })

  test('does not warn for valid search filters', () => {
    expect(customChatSearchHint('user:alice kind:gift source:ws -text:spam')).toBe('')
  })
})
