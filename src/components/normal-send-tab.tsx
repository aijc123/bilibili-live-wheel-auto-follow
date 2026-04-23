import { sendManualDanmaku } from '../lib/danmaku-actions'
import { aiEvasion, customChatEnabled, fasongText, normalSendPanelOpen } from '../lib/store'

export function NormalSendTab() {
  const focusChatterboxComposer = () => {
    const input = document.querySelector<HTMLTextAreaElement>('#laplace-custom-chat textarea')
    input?.focus()
  }

  const sendMessage = async () => {
    const sent = await sendManualDanmaku(fasongText.value)
    if (sent) {
      fasongText.value = ''
    }
  }

  const body = (
    <div className='cb-body cb-stack'>
      {customChatEnabled.value ? (
        <div className='cb-panel cb-stack'>
          <div className='cb-note'>发送入口已合并到 Chatterbox Chat 底部，偷弹幕和这里的草稿会同步。</div>
          <div className='cb-row'>
            <button type='button' className='cb-primary' onClick={focusChatterboxComposer}>
              聚焦 Chatterbox 输入框
            </button>
            <span className='cb-soft'>当前草稿 {fasongText.value.length} 字</span>
          </div>
        </div>
      ) : (
        <>
          <div style={{ position: 'relative' }}>
            <textarea
              value={fasongText.value}
              onInput={e => {
                fasongText.value = e.currentTarget.value
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                  e.preventDefault()
                  void sendMessage()
                }
              }}
              placeholder='输入弹幕内容... (Enter 发送)'
              style={{
                boxSizing: 'border-box',
                height: '50px',
                minHeight: '40px',
                width: '100%',
                resize: 'vertical',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '8px',
                bottom: '6px',
                color: '#999',
                pointerEvents: 'none',
              }}
            >
              {fasongText.value.length}
            </div>
          </div>
          <div className='cb-row'>
            <button type='button' className='cb-primary' onClick={() => void sendMessage()}>
              发送
            </button>
          </div>
        </>
      )}
      <div className='cb-row'>
        <span className='cb-row'>
          <input
            id='aiEvasion'
            type='checkbox'
            checked={aiEvasion.value}
            onInput={e => {
              aiEvasion.value = e.currentTarget.checked
            }}
          />
          <label for='aiEvasion'>AI规避（发送失败时自动检测敏感词并重试）</label>
        </span>
      </div>
    </div>
  )

  if (!customChatEnabled.value) {
    return (
      <div className='cb-section cb-stack' style={{ marginBottom: '.5em' }}>
        <div className='cb-heading' style={{ fontWeight: 'bold', marginBottom: 0 }}>
          常规发送
        </div>
        {body}
      </div>
    )
  }

  return (
    <details
      open={normalSendPanelOpen.value}
      onToggle={e => {
        normalSendPanelOpen.value = e.currentTarget.open
      }}
    >
      <summary style={{ cursor: 'pointer', userSelect: 'none', fontWeight: 'bold' }}>常规发送</summary>
      {body}
    </details>
  )
}
