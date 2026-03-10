import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WindowState, AppId } from '@/types'

const APP_DEFAULTS: Record<AppId, Omit<WindowState, 'id' | 'zIndex' | 'minimized' | 'maximized'>> = {
  terminal: {
    appId: 'terminal',
    title: 'Terminal — bash',
    x: 80, y: 60,
    width: 700, height: 440,
  },
  filemanager: {
    appId: 'filemanager',
    title: 'Files — Dolphin',
    x: 160, y: 80,
    width: 760, height: 500,
  },
  contact: {
    appId: 'contact',
    title: 'contact.txt — Kate',
    x: 220, y: 100,
    width: 520, height: 360,
  },
  about: {
    appId: 'about',
    title: 'About This PC',
    x: 300, y: 140,
    width: 440, height: 320,
  },
}

export const useWindowStore = defineStore('windows', () => {
  const windows = ref<WindowState[]>([])
  let zCounter = 10

  function open(appId: AppId) {
    const existing = windows.value.find(w => w.appId === appId && !w.minimized)
    if (existing) { focus(existing.id); return }

    const minimized = windows.value.find(w => w.appId === appId && w.minimized)
    if (minimized) { minimized.minimized = false; focus(minimized.id); return }

    const defaults = APP_DEFAULTS[appId]
    const id = `${appId}-${Date.now()}`
    const offset = windows.value.length * 20

    windows.value.push({
      ...defaults,
      id,
      zIndex: ++zCounter,
      minimized: false,
      maximized: false,
      x: defaults.x + offset,
      y: defaults.y + offset,
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