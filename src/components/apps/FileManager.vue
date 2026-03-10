<template>
  <div class="fm">
    <aside class="fm-sidebar">
      <p class="sidebar-label text-muted">Places</p>
      <button
        v-for="dir in DIRS" :key="dir.id"
        class="sidebar-item font-mono"
        :class="{ active: activeDir === dir.id }"
        @click="activeDir = dir.id; selectedProject = null"
      >
        <span>{{ dir.icon }}</span> {{ dir.label }}
      </button>
    </aside>

    <div class="fm-main">
      <div class="fm-breadcrumb font-mono">
        <span class="text-muted">~/ </span>
        <span class="text-teal">{{ activeDir }}</span>
      </div>

      <!-- Documents -->
      <div v-if="activeDir === 'documents'" class="fm-grid">
        <div
          v-for="proj in featuredProjects" :key="proj.id"
          class="fm-item"
          :class="{ selected: selected === proj.id }"
          @click="selected = proj.id"
          @dblclick="selectedProject = proj"
        >
          <div class="item-icon">{{ typeIcon(proj.type) }}</div>
          <div class="item-name font-mono">{{ proj.name }}</div>
        </div>
      </div>

      <!-- Music -->
      <div v-else-if="activeDir === 'music'" class="fm-list">
        <div v-for="(m, i) in music" :key="i" class="list-row font-mono">
          <span>🎵</span>
          <span class="list-main">{{ m.artist }} — {{ m.album }}</span>
          <span class="list-meta text-muted">{{ m.year }}</span>
          <span class="list-tag text-dim">{{ m.genre }}</span>
        </div>
      </div>

      <!-- Pictures -->
      <div v-else-if="activeDir === 'pictures'" class="fm-empty font-mono text-muted">
        <p>📷 No photos yet.</p>
        <p class="text-dim">Coming soon...</p>
      </div>

      <!-- Public -->
      <div v-else-if="activeDir === 'public'" class="fm-list">
        <div
          v-for="proj in collabProjects" :key="proj.id"
          class="list-row font-mono"
          @dblclick="selectedProject = proj"
        >
          <span>📂</span>
          <span class="list-main">{{ proj.name }}</span>
          <span class="list-meta text-muted">{{ proj.stack.join(', ') }}</span>
        </div>
      </div>
    </div>

    <!-- Detail panel -->
    <Transition name="slide">
      <div v-if="selectedProject" class="fm-detail">
        <button class="detail-close" @click="selectedProject = null">×</button>
        <div class="detail-icon">{{ typeIcon(selectedProject.type) }}</div>
        <h3 class="font-mono text-teal">{{ selectedProject.name }}</h3>
        <p class="detail-desc text-muted">{{ selectedProject.description }}</p>
        <div class="detail-stack">
          <span v-for="s in selectedProject.stack" :key="s" class="stack-tag font-mono">{{ s }}</span>
        </div>
        <a :href="selectedProject.url" target="_blank" rel="noopener" class="detail-link text-teal font-mono">
          {{ selectedProject.live ? '🌐 Open Live' : '⌥ View on GitHub' }} →
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import projectsData from '@/data/projects.json'
import musicData    from '@/data/music.json'
import type { Project } from '@/types'

const DIRS = [
  { id: 'documents', label: 'Documents', icon: '📁' },
  { id: 'music',     label: 'Music',     icon: '🎵' },
  { id: 'pictures',  label: 'Pictures',  icon: '🖼️' },
  { id: 'public',    label: 'Public',    icon: '📂' },
]

const activeDir      = ref('documents')
const selected       = ref<string | null>(null)
const selectedProject = ref<Project | null>(null)
const music          = musicData
const featuredProjects = computed(() => projectsData.filter(p => p.featured) as Project[])
const collabProjects   = computed(() => projectsData.filter(p => p.type === 'collab') as Project[])

function typeIcon(type: string) {
  if (type === 'web-app')     return '🌐'
  if (type === 'desktop-app') return '🖥️'
  if (type === 'mobile-app')  return '📱'
  return '📂'
}
</script>

<style scoped>
.fm {
  display: flex;
  height: 100%;
  position: relative;
  background: var(--bg-window);
}

.fm-sidebar {
  width: 150px;
  flex-shrink: 0;
  background: var(--bg-deepest);
  border-right: 1px solid var(--border-subtle);
  padding: 12px 0;
}

.sidebar-label {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0 14px 6px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 14px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.sidebar-item:hover  { background: rgba(255,255,255,0.04); color: var(--text-primary); }
.sidebar-item.active { background: rgba(26,188,156,0.1);   color: var(--accent-teal); }

.fm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.fm-breadcrumb {
  font-size: 12px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.fm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
  padding: 16px;
  overflow-y: auto;
  align-content: start;
}

.fm-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background var(--transition-fast);
}
.fm-item:hover    { background: rgba(255,255,255,0.05); }
.fm-item.selected { background: rgba(26,188,156,0.12); }

.item-icon { font-size: 28px; }
.item-name { font-size: 11px; color: var(--text-primary); word-break: break-word; }

.fm-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 8px;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 3px;
  font-size: 12px;
}
.list-row:hover { background: rgba(255,255,255,0.04); }
.list-main { flex: 1; color: var(--text-primary); }
.list-meta { font-size: 11px; }
.list-tag  { font-size: 10px; }

.fm-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
}

.fm-detail {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 220px;
  background: var(--bg-panel);
  border-left: 1px solid var(--border-subtle);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.detail-close {
  align-self: flex-end;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 18px;
  cursor: pointer;
}

.detail-icon { font-size: 36px; }
.detail-desc { font-size: 12px; line-height: 1.6; }

.detail-stack { display: flex; flex-wrap: wrap; gap: 4px; }
.stack-tag {
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 3px;
  background: rgba(107,63,160,0.25);
  color: #a07de8;
  border: 1px solid rgba(107,63,160,0.4);
}

.detail-link { font-size: 12px; text-decoration: none; margin-top: auto; }
.detail-link:hover { text-decoration: underline; }

.slide-enter-active, .slide-leave-active { transition: transform 0.2s ease, opacity 0.2s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(20px); opacity: 0; }
</style>