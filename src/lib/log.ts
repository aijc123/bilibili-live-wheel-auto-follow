import { signal } from '@preact/signals'

import type { SendDanmakuResult } from './api'

import { gmSignal } from './gm-signal'
import { formatDanmakuError } from './utils'

/** Maximum number of lines kept in the rolling log buffer. */
export const maxLogLines = gmSignal('maxLogLines', 1000)

/** Rolling log buffer surfaced by the LogPanel. */
export const logLines = signal<string[]>([])

/**
 * Appends an entry to the shared log.
 *
 * - `appendLog('text')` writes a free-form message.
 * - `appendLog(result, label, display)` writes a formatted send result in the
 *   standard `✅/❌ label: text，原因：...` style.
 */
export function appendLog(message: string): void
export function appendLog(result: SendDanmakuResult, label: string, display: string): void
export function appendLog(arg: string | SendDanmakuResult, label?: string, display?: string): void {
  const now = new Date()
  const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

  const message =
    typeof arg === 'string'
      ? `${ts} ${arg}`
      : arg.cancelled
        ? `${ts} ⏭ ${label}: ${display}（被手动发送中断）`
        : arg.success
          ? `${ts} ✅ ${label}: ${display}`
          : `${ts} ❌ ${label}: ${display}，原因：${formatDanmakuError(arg.error)}`

  const max = maxLogLines.value
  const lines = logLines.value
  const next = lines.length >= max ? [...lines.slice(lines.length - max + 1), message] : [...lines, message]
  logLines.value = next
}
