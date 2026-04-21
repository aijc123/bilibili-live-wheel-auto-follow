import {
  autoParrotCooldownSec,
  autoParrotEnabled,
  autoParrotIncludeReply,
  autoParrotPanelOpen,
  autoParrotRoutineIntervalSec,
  autoParrotThreshold,
  autoParrotUseReplacements,
  autoParrotWindowSec,
} from '../lib/store'

function NumberInput({
  value,
  min,
  max,
  width = '40px',
  onChange,
}: {
  value: number
  min: number
  max?: number
  width?: string
  onChange: (n: number) => void
}) {
  return (
    <input
      type='number'
      autocomplete='off'
      min={String(min)}
      max={max !== undefined ? String(max) : undefined}
      style={{ width }}
      value={value}
      onInput={e => {
        let v = parseInt(e.currentTarget.value, 10)
        if (Number.isNaN(v) || v < min) v = min
        if (max !== undefined && v > max) v = max
        onChange(v)
      }}
    />
  )
}

export function AutoParrotControls() {
  const toggleEnabled = () => {
    autoParrotEnabled.value = !autoParrotEnabled.value
  }

  return (
    <details
      open={autoParrotPanelOpen.value}
      onToggle={e => {
        autoParrotPanelOpen.value = e.currentTarget.open
      }}
    >
      <summary style={{ cursor: 'pointer', userSelect: 'none', fontWeight: 'bold' }}>
        自动鹦鹉{autoParrotEnabled.value ? ' 🟦' : ''}
      </summary>

      <div style={{ margin: '.5em 0', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '.25em' }}>
        <button type='button' onClick={toggleEnabled}>
          {autoParrotEnabled.value ? '停止鹦鹉' : '开始鹦鹉'}
        </button>
      </div>

      <div
        style={{
          margin: '.5em 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.5em',
          alignItems: 'center',
          color: autoParrotEnabled.value ? undefined : '#999',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
          <span>触发：</span>
          <NumberInput
            value={autoParrotWindowSec.value}
            min={3}
            onChange={v => {
              autoParrotWindowSec.value = v
            }}
          />
          <span>秒内重复</span>
          <NumberInput
            value={autoParrotThreshold.value}
            min={2}
            onChange={v => {
              autoParrotThreshold.value = v
            }}
          />
          <span>次</span>
        </span>
      </div>

      <div
        style={{
          margin: '.5em 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.5em',
          alignItems: 'center',
          color: autoParrotEnabled.value ? undefined : '#999',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
          <span>冷却</span>
          <NumberInput
            value={autoParrotCooldownSec.value}
            min={4}
            width='50px'
            onChange={v => {
              autoParrotCooldownSec.value = v
            }}
          />
          <span>秒</span>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
          <span>例行</span>
          <NumberInput
            value={autoParrotRoutineIntervalSec.value}
            min={10}
            width='50px'
            onChange={v => {
              autoParrotRoutineIntervalSec.value = v
            }}
          />
          <span>秒</span>
        </span>
      </div>

      <div
        style={{
          margin: '.5em 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '.75em',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
          <input
            id='autoParrotIncludeReply'
            type='checkbox'
            checked={autoParrotIncludeReply.value}
            onInput={e => {
              autoParrotIncludeReply.value = e.currentTarget.checked
            }}
          />
          <label for='autoParrotIncludeReply'>包含 @ 回复弹幕</label>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25em' }}>
          <input
            id='autoParrotUseReplacements'
            type='checkbox'
            checked={autoParrotUseReplacements.value}
            onInput={e => {
              autoParrotUseReplacements.value = e.currentTarget.checked
            }}
          />
          <label for='autoParrotUseReplacements'>应用替换规则</label>
        </span>
      </div>

      <div style={{ color: '#999', fontSize: '12px', lineHeight: 1.5 }}>
        监测弹幕爆发，任意弹幕在窗口内重复达到阈值时立即跟发（爆发触发），并以加权随机定时检测持续热门（例行触发）。会复用「独轮车」面板里的随机字符
        / 随机颜色 / 最大字数；自己发出的弹幕不会被计入
      </div>
    </details>
  )
}
