import { useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

import { ensureRoomId, getCsrfToken, sendDanmaku } from '../lib/api'
import { BASE_URL } from '../lib/const'
import { appendLog, maxLogLines } from '../lib/log'
import { buildReplacementMap } from '../lib/replacement'
import {
  cachedRoomId,
  danmakuDirectAlwaysShow,
  danmakuDirectConfirm,
  danmakuDirectMode,
  forceScrollDanmaku,
  localGlobalRules,
  localRoomRules,
  optimizeLayout,
  remoteKeywords,
  remoteKeywordsLastSync,
  unlockForbidLive,
} from '../lib/store'
import { EmoteIds } from './emote-ids'

const SYNC_INTERVAL = 10 * 60 * 1000

interface RemoteKeywords {
  global?: { keywords?: Record<string, string> }
  rooms?: Array<{ room: string; keywords?: Record<string, string> }>
}

async function fetchRemoteKeywords(): Promise<RemoteKeywords> {
  const response = await fetch(BASE_URL.REMOTE_KEYWORDS)
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  return await response.json()
}

export function SettingsTab() {
  const syncStatus = useSignal('还没下载')
  const syncStatusColor = useSignal('#666')
  const syncing = useSignal(false)
  const testingRemote = useSignal(false)
  const testingLocal = useSignal(false)

  const globalReplaceFrom = useSignal('')
  const globalReplaceTo = useSignal('')

  const roomReplaceFrom = useSignal('')
  const roomReplaceTo = useSignal('')
  const editingRoomId = useSignal(cachedRoomId.value !== null ? String(cachedRoomId.value) : '')
  const newRoomId = useSignal('')

  const updateRemoteStatus = () => {
    const rk = remoteKeywords.value
    const ls = remoteKeywordsLastSync.value
    if (!rk || !ls) {
      syncStatus.value = '还没下载'
      syncStatusColor.value = '#666'
      return
    }
    const rid = cachedRoomId.value
    const globalCount = Object.keys(rk.global?.keywords ?? {}).length
    let roomCount = 0
    if (rid !== null) {
      const roomData = rk.rooms?.find(r => String(r.room) === String(rid))
      roomCount = Object.keys(roomData?.keywords ?? {}).length
    }
    const timeStr = new Date(ls).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    syncStatus.value = `${timeStr} 已更新，当前可用 ${globalCount + roomCount} 条替换`
    syncStatusColor.value = '#36a185'
  }

  const syncRemote = async () => {
    syncing.value = true
    syncStatus.value = '正在下载…'
    syncStatusColor.value = '#666'
    try {
      const data = await fetchRemoteKeywords()
      remoteKeywords.value = data
      remoteKeywordsLastSync.value = Date.now()
      buildReplacementMap()
      updateRemoteStatus()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      syncStatus.value = `下载失败: ${msg}`
      syncStatusColor.value = '#f44'
      appendLog(`❌ 云端替换规则同步失败: ${msg}`)
    } finally {
      syncing.value = false
    }
  }

  const testKeywordPair = async (
    original: string,
    replaced: string,
    roomId: number,
    csrfToken: string
  ): Promise<{
    originalBlocked: boolean
    replacedBlocked: boolean | null
    originalError?: string
    replacedError?: string
  }> => {
    const originalResult = await sendDanmaku(original, roomId, csrfToken)
    let replacedResult: { success: boolean; error?: string } | null = null
    if (!originalResult.success) {
      await new Promise(r => setTimeout(r, 2000))
      replacedResult = await sendDanmaku(replaced, roomId, csrfToken)
    }
    return {
      originalBlocked: !originalResult.success,
      replacedBlocked: replacedResult ? !replacedResult.success : null,
      originalError: originalResult.error,
      replacedError: replacedResult?.error,
    }
  }

  const logTestResult = (
    result: {
      originalBlocked: boolean
      replacedBlocked: boolean | null
      originalError?: string
      replacedError?: string
    },
    replacedKeyword: string
  ): number => {
    if (result.originalBlocked) {
      appendLog(`  ✅ 原词被屏蔽 (错误: ${result.originalError})，测试替换词: ${replacedKeyword}`)
      if (result.replacedBlocked) {
        appendLog(`  ❌ 替换词也被屏蔽 (错误: ${result.replacedError})`)
      } else {
        appendLog('  ✅ 替换词未被屏蔽')
      }
      return 1
    }
    appendLog('  ⚠️ 原词未被屏蔽，请考虑提交贡献词条')
    return 0
  }

  const testRemote = async () => {
    if (!confirm('会在当前直播间试发这些替换词。直播中不建议测试，可能打扰主播。继续吗？')) return
    testingRemote.value = true
    try {
      const roomId = await ensureRoomId()
      const csrfToken = getCsrfToken()
      if (!csrfToken) {
        appendLog('❌ 未找到登录信息，请先登录 Bilibili')
        return
      }
      const rk = remoteKeywords.value
      const globalKw = Object.entries(rk?.global?.keywords ?? {})
        .filter(([f]) => f)
        .map(([from, to]) => ({ from, to }))
      const rid = cachedRoomId.value
      const roomKw =
        rid !== null
          ? Object.entries(rk?.rooms?.find(r => String(r.room) === String(rid))?.keywords ?? {})
              .filter(([f]) => f)
              .map(([from, to]) => ({ from, to }))
          : []
      const total = globalKw.length + roomKw.length
      if (total === 0) {
        appendLog('⚠️ 还没有下载大家维护的替换词，请先点“立即更新”')
        return
      }
      appendLog(`🔵 开始试发大家维护的替换词，共 ${total} 个`)
      let tested = 0
      let totalBlocked = 0

      if (globalKw.length > 0) {
        appendLog(`\n📡 试发通用替换词 (${globalKw.length} 个)`)
        let blockedCount = 0
        for (const { from, to } of globalKw) {
          tested++
          appendLog(`[${tested}/${total}] 测试: ${from}`)
          const result = await testKeywordPair(from, to, roomId, csrfToken)
          const b = logTestResult(result, to)
          blockedCount += b
          totalBlocked += b
          if (tested < total) await new Promise(r => setTimeout(r, 2000))
        }
        appendLog(`📡 通用替换词试完了：${blockedCount}/${globalKw.length} 个原话会被吞`)
      }

      if (roomKw.length > 0) {
        appendLog(`\n🏠 试发当前房间专用替换词 (${roomKw.length} 个)`)
        let blockedCount = 0
        for (const { from, to } of roomKw) {
          tested++
          appendLog(`[${tested}/${total}] 测试: ${from}`)
          const result = await testKeywordPair(from, to, roomId, csrfToken)
          const b = logTestResult(result, to)
          blockedCount += b
          totalBlocked += b
          if (tested < total) await new Promise(r => setTimeout(r, 2000))
        }
        appendLog(`🏠 当前房间专用替换词试完了：${blockedCount}/${roomKw.length} 个原话会被吞`)
      }

      appendLog(`\n🔵 试发完成！共试了 ${total} 个词，其中 ${totalBlocked} 个原话会被吞`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      appendLog(`🔴 测试出错：${msg}`)
    } finally {
      testingRemote.value = false
    }
  }

  const testLocal = async () => {
    if (!confirm('会在当前直播间试发你自己加的替换词。直播中不建议测试，可能打扰主播。继续吗？')) return
    testingLocal.value = true
    try {
      const roomId = await ensureRoomId()
      const csrfToken = getCsrfToken()
      if (!csrfToken) {
        appendLog('❌ 未找到登录信息，请先登录 Bilibili')
        return
      }
      const globalRules = localGlobalRules.value.filter(r => r.from)
      const rid = cachedRoomId.value
      const roomRules = rid !== null ? (localRoomRules.value[String(rid)] ?? []).filter(r => r.from) : []
      const total = globalRules.length + roomRules.length
      if (total === 0) {
        appendLog('⚠️ 你还没有自己加替换词，先在设置页加一组')
        return
      }
      appendLog(`🔵 开始试发你自己加的替换词，共 ${total} 个`)
      let tested = 0
      let totalBlocked = 0

      if (globalRules.length > 0) {
        appendLog(`\n📋 试发通用替换词 (${globalRules.length} 个)`)
        let blockedCount = 0
        for (const rule of globalRules) {
          tested++
          appendLog(`[${tested}/${total}] 测试: ${rule.from}`)
          const result = await testKeywordPair(rule.from ?? '', rule.to ?? '', roomId, csrfToken)
          const b = logTestResult(result, rule.to ?? '')
          blockedCount += b
          totalBlocked += b
          if (tested < total) await new Promise(r => setTimeout(r, 2000))
        }
        appendLog(`📋 通用替换词试完了：${blockedCount}/${globalRules.length} 个原话会被吞`)
      }

      if (roomRules.length > 0) {
        appendLog(`\n🏠 试发当前房间替换词 (${roomRules.length} 个)`)
        let blockedCount = 0
        for (const rule of roomRules) {
          tested++
          appendLog(`[${tested}/${total}] 测试: ${rule.from}`)
          const result = await testKeywordPair(rule.from ?? '', rule.to ?? '', roomId, csrfToken)
          const b = logTestResult(result, rule.to ?? '')
          blockedCount += b
          totalBlocked += b
          if (tested < total) await new Promise(r => setTimeout(r, 2000))
        }
        appendLog(`🏠 当前房间替换词试完了：${blockedCount}/${roomRules.length} 个原话会被吞`)
      }

      appendLog(`\n🔵 试发完成！共试了 ${total} 个词，其中 ${totalBlocked} 个原话会被吞`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      appendLog(`🔴 测试出错：${msg}`)
    } finally {
      testingLocal.value = false
    }
  }

  const addGlobalRule = () => {
    if (!globalReplaceFrom.value) {
      appendLog('⚠️ “原话”不能为空')
      return
    }
    localGlobalRules.value = [...localGlobalRules.value, { from: globalReplaceFrom.value, to: globalReplaceTo.value }]
    buildReplacementMap()
    globalReplaceFrom.value = ''
    globalReplaceTo.value = ''
  }

  const removeGlobalRule = (index: number) => {
    const next = [...localGlobalRules.value]
    next.splice(index, 1)
    localGlobalRules.value = next
    buildReplacementMap()
  }

  const addRoomRule = () => {
    const rid = editingRoomId.value
    if (!rid) {
      appendLog('⚠️ 先选一个直播间')
      return
    }
    if (!roomReplaceFrom.value) {
      appendLog('⚠️ “原话”不能为空')
      return
    }
    const all = { ...localRoomRules.value }
    const existing = all[rid] ?? []
    all[rid] = [...existing, { from: roomReplaceFrom.value, to: roomReplaceTo.value }]
    localRoomRules.value = all
    buildReplacementMap()
    roomReplaceFrom.value = ''
    roomReplaceTo.value = ''
  }

  const removeRoomRule = (index: number) => {
    const rid = editingRoomId.value
    if (!rid) return
    const all = { ...localRoomRules.value }
    const existing = [...(all[rid] ?? [])]
    existing.splice(index, 1)
    if (existing.length === 0) {
      delete all[rid]
    } else {
      all[rid] = existing
    }
    localRoomRules.value = all
    buildReplacementMap()
  }

  const addRoom = () => {
    const rid = newRoomId.value.trim()
    if (!rid) return
    if (knownRoomIds.includes(rid)) {
      editingRoomId.value = rid
      newRoomId.value = ''
      return
    }
    const all = { ...localRoomRules.value }
    all[rid] = all[rid] ?? []
    localRoomRules.value = all
    editingRoomId.value = rid
    newRoomId.value = ''
  }

  const deleteRoom = (rid: string) => {
    const all = { ...localRoomRules.value }
    delete all[rid]
    localRoomRules.value = all
    if (editingRoomId.value === rid) {
      editingRoomId.value = cachedRoomId.value !== null ? String(cachedRoomId.value) : ''
    }
    buildReplacementMap()
  }

  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    const ls = remoteKeywordsLastSync.value
    if (!ls || Date.now() - ls > SYNC_INTERVAL) {
      void syncRemote()
    } else {
      updateRemoteStatus()
    }
    const timer = setInterval(() => void syncRemote(), SYNC_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  // cachedRoomId is resolved lazily by ensureRoomId(), so it may still be null
  // when this component first mounts. Sync it to the room-rule editor once
  // available, but only if the user hasn't already picked a room manually.
  useEffect(() => {
    if (editingRoomId.value) return
    const rid = cachedRoomId.value
    if (rid !== null) {
      editingRoomId.value = String(rid)
    }
  }, [editingRoomId.value, cachedRoomId.value])

  const globalRules = localGlobalRules.value
  const knownRoomIds = Object.keys(localRoomRules.value)
  const currentRoomStr = cachedRoomId.value !== null ? String(cachedRoomId.value) : null
  if (currentRoomStr && !knownRoomIds.includes(currentRoomStr)) {
    knownRoomIds.unshift(currentRoomStr)
  }
  const editingRules = editingRoomId.value ? (localRoomRules.value[editingRoomId.value] ?? []) : []

  return (
    <>
      <div
        className='cb-section cb-stack'
        style={{ margin: '.5em 0', paddingBottom: '1em', borderBottom: '1px solid var(--Ga2, #eee)' }}
      >
        <div className='cb-heading' style={{ fontWeight: 'bold', marginBottom: '.5em' }}>
          大家一起维护的替换词{' '}
          <a
            href='https://github.com/laplace-live/public/blob/master/artifacts/livesrtream-keywords.json'
            target='_blank'
            style={{ color: '#288bb8', textDecoration: 'none' }}
            rel='noopener'
          >
            我也来补词
          </a>
        </div>
        <div className='cb-note' style={{ marginBlock: '.5em', color: '#666' }}>
          自动下载大家整理好的替换词，遇到容易被吞的弹幕会先换个说法。
        </div>
        <div
          className='cb-row'
          style={{ display: 'flex', gap: '.5em', alignItems: 'center', flexWrap: 'wrap', marginBottom: '.5em' }}
        >
          <button type='button' disabled={syncing.value} onClick={() => void syncRemote()}>
            {syncing.value ? '下载中…' : '立即更新'}
          </button>
          <button type='button' disabled={testingRemote.value} onClick={() => void testRemote()}>
            {testingRemote.value ? '试发中…' : '试试这些词能不能发'}
          </button>
          <span style={{ color: syncStatusColor.value }}>{syncStatus.value}</span>
        </div>
      </div>

      <div
        className='cb-section cb-stack'
        style={{ margin: '.5em 0', paddingBottom: '1em', borderBottom: '1px solid var(--Ga2, #eee)' }}
      >
        <div
          className='cb-row'
          style={{ display: 'flex', gap: '.5em', alignItems: 'center', flexWrap: 'wrap', marginBottom: '.5em' }}
        >
          <div className='cb-heading' style={{ fontWeight: 'bold' }}>
            自己加的通用替换
          </div>
          <button type='button' disabled={testingLocal.value} onClick={() => void testLocal()}>
            {testingLocal.value ? '试发中…' : '试试自己加的词'}
          </button>
        </div>
        <div className='cb-note' style={{ marginBlock: '.5em', color: '#666' }}>
          这里加的词，每个直播间都会用。你自己加的会优先于大家维护的。
        </div>
        <div style={{ marginBottom: '.5em', maxHeight: '160px', overflowY: 'auto' }}>
          {globalRules.length === 0 ? (
            <div className='cb-empty' style={{ color: '#999' }}>
              还没有自己加的通用替换。下面填一组就行。
            </div>
          ) : (
            globalRules.map((rule, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.5em',
                  padding: '.2em',
                  borderBottom: '1px solid var(--Ga2, #eee)',
                }}
              >
                <span style={{ flex: 1, wordBreak: 'break-all', fontFamily: 'monospace' }}>
                  {rule.from ?? '(空)'} → {rule.to ?? '(空)'}
                </span>
                <button
                  type='button'
                  onClick={() => removeGlobalRule(i)}
                  style={{
                    cursor: 'pointer',
                    background: 'transparent',
                    color: 'red',
                    border: 'none',
                    borderRadius: '2px',
                  }}
                >
                  删除
                </button>
              </div>
            ))
          )}
        </div>
        <div className='cb-row' style={{ display: 'flex', gap: '.25em', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            placeholder='原话'
            style={{ flex: 1, minWidth: '80px' }}
            value={globalReplaceFrom.value}
            onInput={e => {
              globalReplaceFrom.value = e.currentTarget.value
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.isComposing) {
                e.preventDefault()
                addGlobalRule()
              }
            }}
          />
          <span>→</span>
          <input
            placeholder='换成'
            style={{ flex: 1, minWidth: '80px' }}
            value={globalReplaceTo.value}
            onInput={e => {
              globalReplaceTo.value = e.currentTarget.value
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.isComposing) {
                e.preventDefault()
                addGlobalRule()
              }
            }}
          />
          <button type='button' onClick={addGlobalRule}>
            加上
          </button>
        </div>
      </div>

      <div
        className='cb-section cb-stack'
        style={{ margin: '.5em 0', paddingBottom: '1em', borderBottom: '1px solid var(--Ga2, #eee)' }}
      >
        <div className='cb-heading' style={{ fontWeight: 'bold', marginBottom: '.5em' }}>
          只给某个直播间用
        </div>
        <div className='cb-note' style={{ marginBlock: '.5em', color: '#666' }}>
          有些房间规矩不一样，可以只给这个房间单独加替换。
        </div>
        <div
          className='cb-row'
          style={{ display: 'flex', gap: '.5em', alignItems: 'center', flexWrap: 'wrap', marginBottom: '.5em' }}
        >
          <select
            value={editingRoomId.value}
            onChange={e => {
              editingRoomId.value = e.currentTarget.value
            }}
            style={{ minWidth: '120px' }}
          >
            <option value='' disabled>
              选一个直播间
            </option>
            {knownRoomIds.map(rid => (
              <option key={rid} value={rid}>
                {rid}
                {rid === currentRoomStr ? ' (当前)' : ''}
              </option>
            ))}
          </select>
          <div className='cb-row' style={{ display: 'flex', gap: '.25em', alignItems: 'center' }}>
            <input
              placeholder='房间号'
              style={{ width: '80px' }}
              value={newRoomId.value}
              onInput={e => {
                newRoomId.value = e.currentTarget.value.replace(/\D/g, '')
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.isComposing) {
                  e.preventDefault()
                  addRoom()
                }
              }}
            />
            <button type='button' onClick={addRoom}>
              加房间
            </button>
          </div>
          {editingRoomId.value && editingRoomId.value !== currentRoomStr && (
            <button type='button' onClick={() => deleteRoom(editingRoomId.value)} style={{ color: 'red' }}>
              删这个房间
            </button>
          )}
        </div>

        {editingRoomId.value ? (
          <>
            <div style={{ marginBottom: '.5em', maxHeight: '160px', overflowY: 'auto' }}>
              {editingRules.length === 0 ? (
                <div className='cb-empty' style={{ color: '#999' }}>
                  这个房间还没单独加词。下面填一组就行。
                </div>
              ) : (
                editingRules.map((rule, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.5em',
                      padding: '.2em',
                      borderBottom: '1px solid var(--Ga2, #eee)',
                    }}
                  >
                    <span style={{ flex: 1, wordBreak: 'break-all', fontFamily: 'monospace' }}>
                      {rule.from ?? '(空)'} → {rule.to ?? '(空)'}
                    </span>
                    <button
                      type='button'
                      onClick={() => removeRoomRule(i)}
                      style={{
                        cursor: 'pointer',
                        background: 'transparent',
                        color: 'red',
                        border: 'none',
                        borderRadius: '2px',
                      }}
                    >
                      删除
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className='cb-row' style={{ display: 'flex', gap: '.25em', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                placeholder='原话'
                style={{ flex: 1, minWidth: '80px' }}
                value={roomReplaceFrom.value}
                onInput={e => {
                  roomReplaceFrom.value = e.currentTarget.value
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.isComposing) {
                    e.preventDefault()
                    addRoomRule()
                  }
                }}
              />
              <span>→</span>
              <input
                placeholder='换成'
                style={{ flex: 1, minWidth: '80px' }}
                value={roomReplaceTo.value}
                onInput={e => {
                  roomReplaceTo.value = e.currentTarget.value
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.isComposing) {
                    e.preventDefault()
                    addRoomRule()
                  }
                }}
              />
              <button type='button' onClick={addRoomRule}>
                加上
              </button>
            </div>
          </>
        ) : (
          <div className='cb-empty' style={{ color: '#999' }}>
            先选一个直播间，或者输入房间号新增。
          </div>
        )}
      </div>

      <div
        className='cb-section cb-stack'
        style={{ margin: '.5em 0', paddingBottom: '1em', borderBottom: '1px solid var(--Ga2, #eee)' }}
      >
        <div className='cb-heading' style={{ fontWeight: 'bold', marginBottom: '.5em' }}>
          表情快捷复制
        </div>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <EmoteIds />
        </div>
      </div>

      <div
        className='cb-section cb-stack'
        style={{ margin: '.5em 0', paddingBottom: '1em', borderBottom: '1px solid var(--Ga2, #eee)' }}
      >
        <div className='cb-heading' style={{ fontWeight: 'bold', marginBottom: '.5em' }}>
          顺手设置
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
          <span className='cb-switch-row' style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
            <input
              id='danmakuDirectMode'
              type='checkbox'
              checked={danmakuDirectMode.value}
              onInput={e => {
                danmakuDirectMode.value = e.currentTarget.checked
              }}
            />
            <label htmlFor='danmakuDirectMode'>在别人弹幕后面放“偷”和“+1”按钮</label>
          </span>
          <span
            className='cb-switch-row'
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em', paddingLeft: '1.5em' }}
          >
            <input
              id='danmakuDirectConfirm'
              type='checkbox'
              checked={danmakuDirectConfirm.value}
              disabled={!danmakuDirectMode.value}
              onInput={e => {
                danmakuDirectConfirm.value = e.currentTarget.checked
              }}
            />
            <label htmlFor='danmakuDirectConfirm' style={{ color: danmakuDirectMode.value ? undefined : '#999' }}>
              点“+1”前先问一下，防止手滑
            </label>
          </span>
          <span
            className='cb-switch-row'
            style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em', paddingLeft: '1.5em' }}
          >
            <input
              id='danmakuDirectAlwaysShow'
              type='checkbox'
              checked={danmakuDirectAlwaysShow.value}
              disabled={!danmakuDirectMode.value}
              onInput={e => {
                danmakuDirectAlwaysShow.value = e.currentTarget.checked
              }}
            />
            <label htmlFor='danmakuDirectAlwaysShow' style={{ color: danmakuDirectMode.value ? undefined : '#999' }}>
              每条弹幕旁边都显示这两个按钮
            </label>
          </span>
          <span className='cb-switch-row' style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
            <input
              id='forceScrollDanmaku'
              type='checkbox'
              checked={forceScrollDanmaku.value}
              onInput={e => {
                forceScrollDanmaku.value = e.currentTarget.checked
              }}
            />
            <label htmlFor='forceScrollDanmaku'>打开插件时，自动把弹幕调成滚动弹幕</label>
          </span>
          <span className='cb-switch-row' style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
            <input
              id='unlockForbidLive'
              type='checkbox'
              checked={unlockForbidLive.value}
              onInput={e => {
                unlockForbidLive.value = e.currentTarget.checked
              }}
            />
            <label htmlFor='unlockForbidLive'>被拉黑的直播间也尽量显示页面（刷新后生效）</label>
          </span>
          <span className='cb-switch-row' style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
            <input
              id='optimizeLayout'
              type='checkbox'
              checked={optimizeLayout.value}
              onInput={e => {
                optimizeLayout.value = e.currentTarget.checked
              }}
            />
            <label htmlFor='optimizeLayout'>让插件面板更适合长时间挂着</label>
          </span>
        </div>
      </div>

      <div className='cb-section cb-stack' style={{ margin: '.5em 0', paddingBottom: '1em' }}>
        <div className='cb-heading' style={{ fontWeight: 'bold', marginBottom: '.5em' }}>
          日志保留多少
        </div>
        <div className='cb-row' style={{ display: 'flex', gap: '.5em', alignItems: 'center', flexWrap: 'wrap' }}>
          <label htmlFor='maxLogLines' style={{ color: '#666' }}>
            最多保留
          </label>
          <input
            id='maxLogLines'
            type='number'
            min='1'
            max='1000'
            style={{ width: '80px' }}
            value={maxLogLines.value}
            onChange={e => {
              let v = parseInt(e.currentTarget.value, 10)
              if (Number.isNaN(v) || v < 1) v = 1
              else if (v > 1000) v = 1000
              maxLogLines.value = v
            }}
          />
          <span style={{ color: '#999', fontSize: '0.9em' }}>行，太多会占地方</span>
        </div>
      </div>
    </>
  )
}
