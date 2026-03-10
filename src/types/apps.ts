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
  youtube?: string
}

export interface PictureEntry {
  id: string
  name: string
  url: string
  date: string
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

export type FMDirectory = 'documents' | 'music' | 'pictures' | 'public'