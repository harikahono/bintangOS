import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BootPhase } from '@/types'

export const useBootStore = defineStore('boot', () => {
  const phase         = ref<BootPhase>('bios')
  const biosLines     = ref<string[]>([])
  const splashProgress = ref(0)
  let   skipped       = false

  const BIOS_MESSAGES = [
    'BintangOS BIOS v1.0.2  Copyright (C) 2026 harikahono',
    'CPU: Intel Core i9-BintangU @ ∞ GHz',
    'RAM: Testing... 8192MB OK',
    'Initializing POST sequence...',
    '[OK] Memory controller initialized',
    '[OK] Storage subsystem detected',
    '[OK] GPU: Imagination Engine 3090 Ti',
    '[OK] Network: existential_crisis_module.ko',
    '[OK] Loading BintangOS kernel...',
    '[OK] Mounting /projects... 10 entries found',
    '[OK] Mounting /music... 10 albums',
    '[OK] Syncing github.com/harikahono...',
    '[WARN] Work-life balance module — not found',
    '[WARN] Sleep schedule — critically low',
    '[OK] Desktop environment ready',
    'Booting BintangOS...',
  ]

  const SPLASH_MESSAGES = [
    'Loading UI subsystems...',
    'Initializing window manager...',
    'Starting BintangDE / Evangelion Edition...',
    'Mounting wallpaper...',
    'Loading portfolio data...',
    'Almost there...',
  ]

  async function startBoot() {
    skipped = false
    phase.value = 'bios'
    biosLines.value = []

    for (const line of BIOS_MESSAGES) {
      if (skipped) return
      await delay(60 + Math.random() * 80)
      if (skipped) return
      biosLines.value.push(line)
    }

    await delay(400)
    if (skipped) return
    phase.value = 'splash'

    splashProgress.value = 0
    for (let i = 0; i <= 100; i += 2) {
      if (skipped) return
      await delay(30)
      splashProgress.value = i
    }

    await delay(500)
    if (skipped) return
    phase.value = 'login'
  }

  function skipBoot() {
    skipped = true
    biosLines.value = [...BIOS_MESSAGES]
    splashProgress.value = 100
    phase.value = 'login'
  }

  function login() {
    phase.value = 'desktop'
  }

  function getSplashMessage(): string {
    const idx = Math.floor((splashProgress.value / 100) * SPLASH_MESSAGES.length)
    return SPLASH_MESSAGES[Math.min(idx, SPLASH_MESSAGES.length - 1)] ?? ''
  }

  return { phase, biosLines, splashProgress, startBoot, skipBoot, login, getSplashMessage }
})

function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms))
}