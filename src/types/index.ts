// ── Boot ──────────────────────────────────────────
export type BootPhase = 'bios' | 'splash' | 'login' | 'desktop'

// ── Window Manager ────────────────────────────────
export type AppId = 'terminal' | 'filemanager' | 'contact' | 'about'

export interface WindowState {
  id: string
  appId: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  minimized: boolean
  maximized: boolean
}

// ── Apps ──────────────────────────────────────────
export interface Project {
  id: string
  name: string
  type: 'web-app' | 'desktop-app' | 'mobile-app' | 'collab'
  stack: string[]
  description: string
  url: string
  live?: boolean
  featured: boolean
}

export interface MusicEntry {
  artist: string
  album: string
  year: number
  genre: string
  note?: string
}

export interface ContactInfo {
  name: string
  handle: string
  github: string
  email: string
  linkedin?: string
  website?: string
  note: string
}

// ── System Tray ───────────────────────────────────
export interface BatteryInfo {
  level: number
  charging: boolean
  supported: boolean
}

// ── File Manager ──────────────────────────────────
export type FMDirectory = 'documents' | 'music' | 'pictures' | 'public'