import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WindowState, AppId } from '@/types'
import { APP_MAP } from '@/data/apps.config'

const APP_TITLES: Record<AppId, string> = {
  terminal:    'Terminal — bash',
  filemanager: 'Files — Dolphin',
  contact:     'contact.txt — Kate',
  about:       'About This PC',
}

const APP_POSITIONS: Record<AppId, { x: number; y: number }> = {
  terminal:    { x: 80,  y: 60  },
  filemanager: { x: 160, y: 80  },
  contact:     { x: 220, y: 100 },
  about:       { x: 300, y: 140 },
}

export const useWindowStore = defineStore('windows', () => {
  const windows = ref<WindowState[]>([])
  let zCounter = 10

  function open(appId: AppId) {
    const existing = windows.value.find(w => w.appId === appId && !w.minimized)
    if (existing) { focus(existing.id); return }

    const minimized = windows.value.find(w => w.appId === appId && w.minimized)
    if (minimized) { minimized.minimized = false; focus(minimized.id); return }

    const meta = APP_MAP[appId]
    const pos  = APP_POSITIONS[appId]
    const offset = windows.value.length * 20
    const id = `${appId}-${Date.now()}`

    windows.value.push({
      id,
      appId,
      title:     APP_TITLES[appId],
      x:         pos.x + offset,
      y:         pos.y + offset,
      width:     meta.defaultWidth,
      height:    meta.defaultHeight,
      zIndex:    ++zCounter,
      minimized: false,
      maximized: false,
    })
  }

  function close(id: string) {
    windows.value = windows.value.filter(w => w.id !== id)
  }

  function focus(id: string) {
    const win = windows.value.find(w => w.id === id)
    if (win) win.zIndex = ++zCounter
  }

  function minimize(id: string) {
    const win = windows.value.find(w => w.id === id)
    if (win) win.minimized = !win.minimized
  }

  function toggleMaximize(id: string) {
    const win = windows.value.find(w => w.id === id)
    if (win) win.maximized = !win.maximized
  }

  function move(id: string, x: number, y: number) {
    const win = windows.value.find(w => w.id === id)
    if (win && !win.maximized) { win.x = x; win.y = y }
  }

  return { windows, open, close, focus, minimize, toggleMaximize, move }
})