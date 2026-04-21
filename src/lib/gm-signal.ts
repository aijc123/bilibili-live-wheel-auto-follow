import { effect, signal } from '@preact/signals'

import { GM_getValue, GM_setValue } from '$'

/**
 * Creates a signal whose value is read from and persisted to GM storage
 * under the given key.
 */
export function gmSignal<T>(key: string, defaultValue: T) {
  const s = signal<T>(GM_getValue(key, defaultValue))
  effect(() => GM_setValue(key, s.value))
  return s
}
