import { useComputed, useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'

import { getDedeUid } from '../lib/api'
import {
  getFilteredMedalResults,
  getMedalCheckCounts,
  medalCheckResultsByUid,
  medalCheckStatusByUid,
  medalStatusColor,
  medalStatusTitle,
} from '../lib/medal-check-state'
import { activeTab, medalStatusPanelOpen } from '../lib/store'

/**
 * 主面板「我的状态」section ——粉丝牌禁言巡检的紧凑视图。
 *
 * 设计意图 (Jobs 式 #8): 重度直播观众每天会被主播拉黑/禁言/风控,这是 self-
 * defense 信息,不是设置项。原本巡检功能埋在设置里,用户只在"想起来"的时
 * 候打开;升级为主面板自带 section 后,打开浮窗一眼就能看到「今日在 N 个房间
 * 被屏蔽」——重度观众的"健康检查"。
 *
 * 职责分工:
 *  - 本组件:**只读 + 跳转**。summary 给一个 health-at-a-glance 状态行;展开
 *    后给最多 3 条最严重的房间 + 计数 + "在设置里查看完整列表 / 发起新巡检"
 *    按钮(跳到 settings tab,用户在那里点检查按钮)。
 *  - `settings/medal-check-section.tsx`(现有):完整 UI,负责发起巡检、配置
 *    Guard Room 同步、显示完整列表 + filter + 复制/下载报告。
 *
 * 两个消费者读同一份 `medal-check-state.ts` 里的 GM 持久 signal,无重复存储。
 */
export function MedalStatusPanel() {
  // 跟踪 cookie 的 DedeUserID — 用户切账号(另开 tab 登录别的号)后,主面板
  // 立刻显示新账号的缓存。pattern 同 settings/medal-check-section 里的
  // `currentUid` (5 秒轮询 + visibility 唤醒)。
  const currentUid = useSignal<string | null>(getDedeUid() ?? null)
  useEffect(() => {
    const tick = () => {
      const next = getDedeUid() ?? null
      if (currentUid.value !== next) currentUid.value = next
    }
    tick()
    const id = setInterval(tick, 5000)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tick()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const results = useComputed(() => {
    const uid = currentUid.value
    if (!uid) return []
    return medalCheckResultsByUid.value[uid] ?? []
  })

  const statusLine = useComputed(() => {
    const uid = currentUid.value
    if (!uid) return ''
    return medalCheckStatusByUid.value[uid] ?? ''
  })

  // Summary 文本根据账号状态 + 是否有数据决定:
  //  - 未登录:"请先登录"
  //  - 已登录但无缓存数据:"尚未巡检"
  //  - 已登录有数据:计数摘要"限制 N · 未知 M · 共 K 房间"
  const summaryText = useComputed(() => {
    if (!currentUid.value) return '请先登录 Bilibili'
    const list = results.value
    if (list.length === 0) return '尚未巡检'
    const counts = getMedalCheckCounts(list)
    const parts: string[] = []
    if (counts.restricted > 0) parts.push(`限制 ${counts.restricted}`)
    if (counts.unknown > 0) parts.push(`未知 ${counts.unknown}`)
    if (counts.deactivated > 0) parts.push(`注销 ${counts.deactivated}`)
    if (parts.length === 0) {
      // 全部正常时给一句"X 个房间均正常",别让 summary 空洞。
      return `${list.length} 个房间均正常`
    }
    return `${parts.join(' · ')}（共 ${list.length} 房间）`
  })

  // Summary 颜色:有 restricted 或 unknown → 警告橙;只有注销 → 灰;全正常 → 绿。
  const summaryColor = useComputed(() => {
    if (!currentUid.value) return 'var(--cb-warning-text)'
    const list = results.value
    if (list.length === 0) return '#888'
    const counts = getMedalCheckCounts(list)
    if (counts.restricted > 0 || counts.unknown > 0) return 'var(--cb-warning-text)'
    if (counts.deactivated > 0) return '#666'
    return 'var(--cb-success-text)'
  })

  // 跳设置:复用 `activeTab` signal(`onboarding.tsx` 等都这么干),并把搜索
  // 框预填上"粉丝牌"让那个 section 直接展开 + 高亮。settings-tab.tsx 自己会
  // 处理 search query。
  const openSettingsToMedalCheck = () => {
    activeTab.value = 'settings'
    // 设置页的 search 是 settings-tab 自己 useSignal 的本地状态,这里没法直接
    // 写。用户进去后看到的就是默认视图——粉丝牌巡检在"高级"组里,默认折叠。
    // 但点击 "▸ 显示高级设置" 后就能看到。后续 #10 砍设置项时可以考虑把巡检
    // 提到"常用"区,这里就不用专门处理跳转高亮了。
  }

  const top3Issues = useComputed(() =>
    // top 3 worst rooms—severity-sorted (restricted > unknown > deactivated > ok)
    // via getFilteredMedalResults('issues'). Slice 3 to keep the panel compact.
    getFilteredMedalResults(results.value, 'issues').slice(0, 3)
  )

  return (
    <details
      className='cb-core-group'
      open={medalStatusPanelOpen.value}
      onToggle={e => {
        medalStatusPanelOpen.value = e.currentTarget.open
      }}
      style={{ marginTop: '8px' }}
    >
      <summary
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          fontWeight: 'bold',
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'baseline',
          gap: '.4em',
          flexWrap: 'wrap',
        }}
      >
        <span>我的状态</span>
        <span className='cb-soft' style={{ fontWeight: 'normal', fontSize: '0.85em', color: summaryColor.value }}>
          · {summaryText.value}
        </span>
      </summary>
      <div className='cb-body cb-stack' style={{ padding: '6px 10px 10px', gap: '6px' }}>
        {!currentUid.value && (
          <div className='cb-note' style={{ color: '#666', fontSize: '0.85em' }}>
            登录 Bilibili 后才能巡检自己的粉丝牌房间状态。
          </div>
        )}

        {currentUid.value && results.value.length === 0 && (
          <div className='cb-note' style={{ color: '#666', fontSize: '0.85em' }}>
            还没巡检过。
            {statusLine.value ? `上次状态: ${statusLine.value}` : '点下面的按钮在设置页发起一次巡检。'}
          </div>
        )}

        {currentUid.value && results.value.length > 0 && (
          <>
            {top3Issues.value.length === 0 ? (
              <div className='cb-note' style={{ color: 'var(--cb-success-text)', fontSize: '0.85em' }}>
                ✓ 上次巡检全部房间正常({results.value.length} 间)。
              </div>
            ) : (
              <div className='cb-stack' style={{ gap: '4px' }}>
                <div className='cb-note' style={{ color: '#666', fontSize: '0.8em' }}>
                  最严重的{top3Issues.value.length === 3 ? ' 3 ' : ''}条:
                </div>
                {top3Issues.value.map(result => (
                  <div
                    key={result.room.roomId}
                    style={{
                      display: 'flex',
                      gap: '.5em',
                      alignItems: 'baseline',
                      fontSize: '0.85em',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ wordBreak: 'break-all' }}>
                      {result.room.anchorName} <span style={{ color: '#888' }}>/ {result.room.medalName}</span>
                    </span>
                    <span style={{ color: medalStatusColor(result.status), whiteSpace: 'nowrap' }}>
                      {medalStatusTitle(result.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {statusLine.value && (
              <div className='cb-note' style={{ color: '#888', fontSize: '0.8em' }}>
                · {statusLine.value}
              </div>
            )}
          </>
        )}

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type='button' className='cb-btn' onClick={openSettingsToMedalCheck} style={{ fontSize: '0.85em' }}>
            {results.value.length > 0 ? '在设置里看完整列表 / 重新巡检 →' : '去设置发起巡检 →'}
          </button>
        </div>
      </div>
    </details>
  )
}
