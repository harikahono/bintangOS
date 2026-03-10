<template>
  <div class="desktop" @click="selectedIcon = null">
    <div class="wallpaper"></div>
    <div class="icon-grid">
      <DesktopIcon
        v-for="icon in ICONS"
        :key="icon.appId"
        :icon="icon"
        :selected="selectedIcon === icon.appId"
        @select="selectedIcon = icon.appId"
        @open="winStore.open(icon.appId)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWindowStore } from '@/stores/windowManager'
import DesktopIcon from './DesktopIcon.vue'
import type { AppId } from '@/types'

const winStore = useWindowStore()
const selectedIcon = ref<AppId | null>(null)

const ICONS: { appId: AppId; label: string; icon: string }[] = [
  { appId: 'terminal',    label: 'Terminal',      icon: '⬛' },
  { appId: 'filemanager', label: 'Files',          icon: '📁' },
  { appId: 'contact',     label: 'contact.txt',    icon: '📄' },
  { appId: 'about',       label: 'About This PC',  icon: '💻' },
]
</script>

<style scoped>
.desktop {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.wallpaper {
  position: absolute;
  inset: 0;
  background-image: url('/wallpaper.webp');
  background-size: cover;
  background-position: center;
}

.icon-grid {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>