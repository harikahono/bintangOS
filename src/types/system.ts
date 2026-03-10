export type BootPhase = 'bios' | 'splash' | 'login' | 'desktop'

export interface BatteryInfo {
  level: number
  charging: boolean
  supported: boolean
}