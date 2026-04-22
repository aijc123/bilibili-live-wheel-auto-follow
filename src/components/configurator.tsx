import { activeTab, dialogOpen, optimizeLayout } from '../lib/store'
import { AboutTab } from './about-tab'
import { AutoBlendControls } from './auto-blend-controls'
import { AutoSendControls } from './auto-send-controls'
import { LogPanel } from './log-panel'
import { MemesList } from './memes-list'
import { NormalSendTab } from './normal-send-tab'
import { SettingsTab } from './settings-tab'
import { SttTab } from './stt-tab'
import { Tabs } from './tabs'

export function Configurator() {
  const tab = activeTab.value
  const visible = dialogOpen.value
  const optimized = optimizeLayout.value

  return (
    <div
      id='laplace-chatterbox-dialog'
      style={{
        position: 'fixed',
        right: '8px',
        bottom: '46px',
        zIndex: 2147483647,
        display: visible ? (optimized ? 'flex' : 'block') : 'none',
        flexDirection: optimized ? 'column' : undefined,
        height: optimized ? 'calc(100vh - 110px)' : undefined,
        maxHeight: optimized ? undefined : 'calc(100vh - 110px)',
        overflowY: optimized ? 'hidden' : 'auto',
        width: '320px',
      }}
    >
      <Tabs />

      <div
        style={{
          display: tab === 'fasong' ? (optimized ? 'flex' : 'block') : 'none',
          flexDirection: optimized ? 'column' : undefined,
          flex: optimized ? 1 : undefined,
          minHeight: optimized ? 0 : undefined,
        }}
        className='cb-scroll'
      >
        <AutoSendControls />

        <div>
          <AutoBlendControls />
        </div>

        <div
          style={{
            margin: '.25rem 0',
            ...(optimized && { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }),
          }}
        >
          <MemesList />
        </div>
        <NormalSendTab />
      </div>

      <div
        style={{
          display: tab === 'tongchuan' ? (optimized ? 'flex' : 'block') : 'none',
          flexDirection: optimized ? 'column' : undefined,
          flex: optimized ? 1 : undefined,
          minHeight: optimized ? 0 : undefined,
          overflowY: optimized ? 'auto' : undefined,
        }}
        className='cb-scroll'
      >
        <SttTab />
      </div>

      <div
        style={{
          display: tab === 'settings' ? (optimized ? 'flex' : 'block') : 'none',
          flexDirection: optimized ? 'column' : undefined,
          flex: optimized ? 1 : undefined,
          minHeight: optimized ? 0 : undefined,
          overflowY: optimized ? 'auto' : undefined,
        }}
        className='cb-scroll'
      >
        <SettingsTab />
      </div>

      <div
        style={{
          display: tab === 'about' ? (optimized ? 'flex' : 'block') : 'none',
          flexDirection: optimized ? 'column' : undefined,
          flex: optimized ? 1 : undefined,
          minHeight: optimized ? 0 : undefined,
          overflowY: optimized ? 'auto' : undefined,
        }}
        className='cb-scroll'
      >
        <AboutTab />
      </div>

      <div style={{ paddingInline: '10px', paddingBlockEnd: '10px' }}>
        <LogPanel />
      </div>
    </div>
  )
}
