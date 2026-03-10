import { defineStore } from 'pinia'
import { ref, onScopeDispose } from 'vue'
import type { BatteryInfo } from '@/types'

export const useSystemTrayStore = defineStore('systemTray', () => {
  const now     = ref(new Date())
  const battery = ref<BatteryInfo>({ level: 1, charging: false, supported: false })
  const online  = ref(navigator.onLine)

  // Clock
  const clockTimer = setInterval(() => { now.value = new Date() }, 1000)

  // Battery
  async function initBattery() {
    if (!('getBattery' in navigator)) return
    try {
      const bat = await (navigator as any).getBattery()
      battery.value = { level: bat.level, charging: bat.charging, supported: true }
      bat.addEventListener('levelchange',    () => { battery.value.level    = bat.level })
      bat.addEventListener('chargingchange', () => { battery.value.charging = bat.charging })
    } catch {
      battery.value.supported = false
    }
  }

  // Network
  const onOnline  = () => { online.value = true }
  const onOffline = () => { online.value = false }
  window.addEventListener('online',  onOnline)
  window.addEventListener('offline', onOffline)

  // Cleanup
  onScopeDispose(() => {
    clearInterval(clockTimer)
    window.removeEventListener('online',  onOnline)
    window.removeEventListener('offline', onOffline)
  })

  initBattery()

  function formatTime(d: Date) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function formatDate(d: Date) {
    return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  }

  function batteryIcon() {
    if (!battery.value.supported)     return '🔋'
    if (battery.value.charging)       return '⚡'
    if (battery.value.level > 0.75)   return '🔋'
    if (battery.value.level > 0.4)    return '🪫'
    return '🔴'
  }

  function batteryLabel() {
    if (!battery.value.supported) return '--'
    return `${Math.round(battery.value.level * 100)}%`
  }

  return { now, battery, online, formatTime, formatDate, batteryIcon, batteryLabel }
})