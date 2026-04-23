import { unsafeWindow } from '$'
import { unlockForbidLive } from './store'

/** Patches fetch() responses for specific Bilibili live API endpoints. */
;(() => {
  const pageWindow = unsafeWindow
  const originalFetch = pageWindow.fetch
  const patchedFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = input instanceof Request ? input.url : input.toString()
    const resp = await originalFetch.call(pageWindow, input, init)

    if (unlockForbidLive.value && url.includes('/xlive/web-room/v1/index/getInfoByUser')) {
      const text = await resp.text()
      try {
        const data = JSON.parse(text)
        if (data?.data?.forbid_live) {
          data.data.forbid_live.is_forbid = false
          data.data.forbid_live.forbid_text = ''
          return new Response(JSON.stringify(data), {
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers,
          })
        }
      } catch {
        /* not JSON, return as-is */
      }
      return new Response(text, {
        status: resp.status,
        statusText: resp.statusText,
        headers: resp.headers,
      })
    }

    return resp
  }
  pageWindow.fetch = Object.assign(patchedFetch, originalFetch)
})()
