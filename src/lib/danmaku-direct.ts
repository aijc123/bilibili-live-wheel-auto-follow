import { effect as signalEffect } from '@preact/signals'

import { showConfirm } from '../components/ui/alert-dialog'
import { ensureRoomId, getCsrfToken } from './api'
import { type DanmakuEvent, subscribeDanmaku } from './danmaku-stream'
import { appendLog } from './log'
import { applyReplacements } from './replacement'
import { enqueueDanmaku, SendPriority } from './send-queue'
import {
  activeTab,
  danmakuDirectAlwaysShow,
  danmakuDirectConfirm,
  danmakuDirectMode,
  dialogOpen,
  fasongText,
} from './store'

const MARKER = 'lc-dm-direct'
const STYLE_ID = 'lc-dm-direct-style'

const STYLE = `
.chat-item.danmaku-item {
  position: relative;
}
.${MARKER} {
  display: inline-flex;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  gap: 2px;
  opacity: 0;
  transition: opacity .15s, transform .15s;
  user-select: none;
  pointer-events: none;
  z-index: 2;
}
.chat-item.danmaku-item:hover .${MARKER},
.${MARKER}:hover {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(-50%) translateX(-2px);
}
.${MARKER}.lc-dm-direct-peek {
  opacity: 1;
  pointer-events: auto;
}
.${MARKER} button {
  all: unset;
  cursor: pointer;
  min-width: 20px;
  padding: 2px 4px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: #fff;
  background: rgba(0, 0, 0, .62);
  font-size: 12px;
  transition: background .1s;
}
.${MARKER} button:hover {
  background: rgba(0, 0, 0, .82);
}
html.lc-dm-direct-always .${MARKER} {
  opacity: 1;
  pointer-events: auto;
}
`

/**
 * Builds the actual danmaku string we'd send for a given event.
 * Reply danmakus need an `@uname ` prefix to be meaningful when re-sent.
 * Returns null when the message can't be reliably reconstructed.
 */
function eventToSendableMessage(ev: DanmakuEvent): string | null {
  if (!ev.isReply) return ev.text
  return ev.uname ? `@${ev.uname} ${ev.text}` : null
}

function injectButtons(node: HTMLElement, msg: string): void {
  if (node.querySelector(`.${MARKER}`)) return
  const anchor = node.querySelector('.danmaku-item-right')
  if (!anchor) return

  const container = document.createElement('span')
  container.className = `${MARKER} lc-dm-direct-peek`
  container.dataset.msg = msg

  const stealBtn = document.createElement('button')
  stealBtn.type = 'button'
  stealBtn.textContent = '偷'
  stealBtn.title = '偷弹幕到发送框'
  stealBtn.dataset.action = 'steal'

  const repeatBtn = document.createElement('button')
  repeatBtn.type = 'button'
  repeatBtn.textContent = '+1'
  repeatBtn.title = '+1 发送弹幕'
  repeatBtn.dataset.action = 'repeat'

  container.appendChild(stealBtn)
  container.appendChild(repeatBtn)
  anchor.after(container)

  window.setTimeout(() => {
    container.classList.remove('lc-dm-direct-peek')
  }, 2400)
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    textarea.remove()
    return ok
  }
}

async function handleSteal(msg: string): Promise<void> {
  const copied = await copyText(msg)
  fasongText.value = msg
  activeTab.value = 'fasong'
  dialogOpen.value = true
  appendLog(copied ? `🥷 偷并复制: ${msg}` : `🥷 偷: ${msg}`)
}

async function handleRepeat(msg: string, anchor?: { x: number; y: number }): Promise<void> {
  if (danmakuDirectConfirm.value) {
    const confirmed = await showConfirm({ title: '确认发送以下弹幕？', body: msg, confirmText: '发送', anchor })
    if (!confirmed) return
  }

  try {
    const roomId = await ensureRoomId()
    const csrfToken = getCsrfToken()
    if (!csrfToken) {
      appendLog('❌ 未找到登录信息，请先登录 Bilibili')
      return
    }
    const processed = applyReplacements(msg)
    const result = await enqueueDanmaku(processed, roomId, csrfToken, SendPriority.MANUAL)
    const display = msg !== processed ? `${msg} → ${processed}` : processed
    appendLog(result, '+1', display)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    appendLog(`🔴 +1 出错：${message}`)
  }
}

function handleDelegatedClick(e: MouseEvent): void {
  const target = e.target
  if (!(target instanceof HTMLElement)) return
  const btn = target.closest<HTMLElement>(`.${MARKER} button`)
  if (!btn) return
  e.stopPropagation()
  const container = btn.closest<HTMLElement>(`.${MARKER}`)
  const msg = container?.dataset.msg
  if (!msg) return
  const action = btn.dataset.action
  if (action === 'steal') void handleSteal(msg)
  else if (action === 'repeat') {
    void handleRepeat(msg, { x: e.clientX, y: e.clientY })
  }
}

let unsubscribe: (() => void) | null = null
let styleEl: HTMLStyleElement | null = null
let attachedContainer: HTMLElement | null = null
let alwaysShowDispose: (() => void) | null = null
let contextMenuHandler: (() => void) | null = null

function closeNativeContextMenu(): void {
  for (const li of document.querySelectorAll('li')) {
    if (li.textContent?.trim() === '关闭') {
      li.click()
      return
    }
  }
}

function createContextMenuItem(source: HTMLLIElement, label: string): HTMLLIElement {
  const item = document.createElement('li')
  item.className = source.className
  item.dataset.lc = ''
  item.textContent = label
  return item
}

function tryInjectContextMenuItems(li: HTMLLIElement): void {
  if (li.textContent?.trim() !== '复制弹幕') return

  const ul = li.parentElement
  if (!ul || ul.querySelector('[data-lc]')) return

  const repeatEl = createContextMenuItem(li, '弹幕 +1')

  repeatEl.onclick = (e: MouseEvent) => {
    const text = ul.parentElement?.querySelector('span')?.textContent?.trim() ?? null
    if (text) {
      void handleRepeat(text, { x: e.clientX, y: e.clientY })
    }
    closeNativeContextMenu()
  }

  const stealEl = createContextMenuItem(li, '偷弹幕')

  stealEl.onclick = () => {
    const text = ul.parentElement?.querySelector('span')?.textContent?.trim() ?? null
    if (text) {
      void handleSteal(text)
    }
    closeNativeContextMenu()
  }

  ul.insertBefore(stealEl, li.nextSibling)
  ul.insertBefore(repeatEl, li.nextSibling)
}

function initContextMenuHijack(): void {
  if (contextMenuHandler) return

  contextMenuHandler = () => {
    requestAnimationFrame(() => {
      for (const li of document.querySelectorAll<HTMLLIElement>('li')) {
        tryInjectContextMenuItems(li)
      }
    })
  }

  document.addEventListener('contextmenu', contextMenuHandler)
}

function stopContextMenuHijack(): void {
  if (contextMenuHandler) {
    document.removeEventListener('contextmenu', contextMenuHandler)
    contextMenuHandler = null
  }
}

export function startDanmakuDirect(): void {
  if (unsubscribe) return

  alwaysShowDispose = signalEffect(() => {
    document.documentElement.classList.toggle('lc-dm-direct-always', danmakuDirectAlwaysShow.value)
  })

  initContextMenuHijack()

  unsubscribe = subscribeDanmaku({
    onAttach: container => {
      styleEl = document.createElement('style')
      styleEl.id = STYLE_ID
      styleEl.textContent = STYLE
      document.head.appendChild(styleEl)

      attachedContainer = container
      container.addEventListener('click', handleDelegatedClick, true)
    },
    onMessage: ev => {
      if (!danmakuDirectMode.value) return
      const msg = eventToSendableMessage(ev)
      if (msg !== null) injectButtons(ev.node, msg)
    },
    emitExisting: true,
  })
}

export function stopDanmakuDirect(): void {
  stopContextMenuHijack()
  if (alwaysShowDispose) {
    alwaysShowDispose()
    alwaysShowDispose = null
    document.documentElement.classList.remove('lc-dm-direct-always')
  }
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  if (attachedContainer) {
    attachedContainer.removeEventListener('click', handleDelegatedClick, true)
    attachedContainer = null
  }
  if (styleEl) {
    styleEl.remove()
    styleEl = null
  }
  for (const el of Array.from(document.querySelectorAll(`.${MARKER}`))) {
    el.remove()
  }
}
