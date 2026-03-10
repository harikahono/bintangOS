import type { AppId } from '@/types'

export interface AppMeta {
  appId: AppId
  label: string
  icon: string
  defaultWidth: number
  defaultHeight: number
}

export const APP_REGISTRY: AppMeta[] = [
  { appId: 'terminal',    label: 'Terminal',      icon: '⬛', defaultWidth: 640, defaultHeight: 420 },
  { appId: 'filemanager', label: 'Files',          icon: '📁', defaultWidth: 720, defaultHeight: 480 },
  { appId: 'contact',     label: 'contact.txt',    icon: '📄', defaultWidth: 500, defaultHeight: 340 },
  { appId: 'about',       label: 'About This PC',  icon: '💻', defaultWidth: 400, defaultHeight: 360 },
]

export const APP_MAP = Object.fromEntries(
  APP_REGISTRY.map(a => [a.appId, a])
) as Record<AppId, AppMeta>