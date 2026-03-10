import { ref, computed } from 'vue'
import projectsData  from '@/data/projects.json'
import musicData     from '@/data/music.json'
import picturesData  from '@/data/pictures.json'
import type { Project, FMDirectory, PictureEntry, MusicEntry } from '@/types'

export const DIRS: { id: FMDirectory; label: string; icon: string }[] = [
  { id: 'documents', label: 'Documents', icon: '📁' },
  { id: 'music',     label: 'Music',     icon: '🎵' },
  { id: 'pictures',  label: 'Pictures',  icon: '🖼️' },
  { id: 'public',    label: 'Public',    icon: '📂' },
]

const BASE = import.meta.env.BASE_URL

export function useFileManager() {
  const activeDir        = ref<FMDirectory>('documents')
  const selected         = ref<string | null>(null)
  const selectedProject  = ref<Project | null>(null)
  const selectedPicture  = ref<PictureEntry | null>(null)
  const music            = musicData as MusicEntry[]

  const pictures = (picturesData as PictureEntry[]).map(p => ({
    ...p,
    url: `${BASE}${p.name}`,
  }))

  const featuredProjects = computed(() => projectsData.filter(p => p.featured) as Project[])
  const collabProjects   = computed(() => projectsData.filter(p => p.type === 'collab') as Project[])

  function changeDir(dir: FMDirectory) {
    activeDir.value       = dir
    selected.value        = null
    selectedProject.value = null
    selectedPicture.value = null
  }

  function typeIcon(type: string) {
    if (type === 'web-app')     return '🌐'
    if (type === 'desktop-app') return '🖥️'
    if (type === 'mobile-app')  return '📱'
    return '📂'
  }

  return {
    activeDir,
    selected,
    selectedProject,
    selectedPicture,
    music,
    pictures,
    featuredProjects,
    collabProjects,
    changeDir,
    typeIcon,
  }
}