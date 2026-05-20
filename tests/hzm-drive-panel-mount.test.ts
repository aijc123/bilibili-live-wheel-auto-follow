/**
 * Regression tests for `decideHzmMount` —— 智驾面板挂载决策。
 *
 * 起因:PR #36 上 Codex review 抓到一个 P1 bug —— 用户在非灰泽满房间开了智驾,
 * `hzm-auto-drive.tick()` 在后台跑,但如果 `currentMemesList` 瞬时被打回空
 * (LAPLACE 拉取失败 / 切到新房间还没 polling 到),原代码 `memesCount < 10` 直接
 * unmount 面板,用户找不到停车按钮。修复:drive 已在跑时永远挂载。
 *
 * 把决策抽成纯函数 `decideHzmMount` 是为了能在这里稳定断言,不需要起 Preact 渲染。
 */

import { describe, expect, test } from 'bun:test'

import type { MemeSource } from '../src/lib/meme-sources'

import { decideHzmMount, MIN_MEMES_FOR_GENERIC_DRIVE } from '../src/components/hzm-drive-panel'

const NATIVE_SOURCE: MemeSource = {
  roomId: 1713546334,
  name: '灰泽满烂梗库',
  listEndpoint: 'https://sbhzm.cn/api/public/memes',
}

describe('decideHzmMount', () => {
  test('null roomId → none', () => {
    const result = decideHzmMount({ roomId: null, source: null, memesCount: 100, driveEnabled: false })
    expect(result.kind).toBe('none')
  })

  test('native source: mounts regardless of memesCount or driveEnabled', () => {
    for (const memesCount of [0, 5, 100]) {
      for (const driveEnabled of [false, true]) {
        const result = decideHzmMount({ roomId: 1713546334, source: NATIVE_SOURCE, memesCount, driveEnabled })
        expect(result).toEqual({ kind: 'native', source: NATIVE_SOURCE })
      }
    }
  })

  test('no source + drive off + memesCount<10 → none (normal entry gate)', () => {
    const result = decideHzmMount({
      roomId: 99999,
      source: null,
      memesCount: MIN_MEMES_FOR_GENERIC_DRIVE - 1,
      driveEnabled: false,
    })
    expect(result.kind).toBe('none')
  })

  test('no source + drive off + memesCount≥10 → synthetic (normal entry)', () => {
    const result = decideHzmMount({
      roomId: 99999,
      source: null,
      memesCount: MIN_MEMES_FOR_GENERIC_DRIVE,
      driveEnabled: false,
    })
    expect(result).toEqual({ kind: 'synthetic', roomId: 99999 })
  })

  test('REGRESSION: no source + drive ON + memesCount<10 → still synthetic (panel must stay mounted)', () => {
    // Codex P1: panel mustn't disappear while drive is running, even if memes dropped to 0
    for (const memesCount of [0, 1, 5, MIN_MEMES_FOR_GENERIC_DRIVE - 1]) {
      const result = decideHzmMount({ roomId: 99999, source: null, memesCount, driveEnabled: true })
      expect(result).toEqual({ kind: 'synthetic', roomId: 99999 })
    }
  })

  test('REGRESSION: no source + drive ON + memesCount=0 (LAPLACE down briefly) → still synthetic', () => {
    const result = decideHzmMount({ roomId: 99999, source: null, memesCount: 0, driveEnabled: true })
    expect(result).toEqual({ kind: 'synthetic', roomId: 99999 })
  })

  test('exact threshold: memesCount = MIN_MEMES_FOR_GENERIC_DRIVE → synthetic (≥, not >)', () => {
    const result = decideHzmMount({
      roomId: 99999,
      source: null,
      memesCount: MIN_MEMES_FOR_GENERIC_DRIVE,
      driveEnabled: false,
    })
    expect(result.kind).toBe('synthetic')
  })

  test('synthetic decision carries roomId through (for makeSyntheticSource)', () => {
    const result = decideHzmMount({ roomId: 42, source: null, memesCount: 50, driveEnabled: false })
    expect(result).toEqual({ kind: 'synthetic', roomId: 42 })
  })
})
