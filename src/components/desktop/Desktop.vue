<template>
  <div
    class="desktop"
    @click="selectedIcon = null"
    @contextmenu.prevent="onRightClick"
  >
    <div class="wallpaper"></div>
    <div class="icon-grid">
      <DesktopIcon
        v-for="app in APP_REGISTRY"
        :key="app.appId"
        :icon="app"
        :selected="selectedIcon === app.appId"
        @select="selectedIcon = app.appId"
        @open="winStore.open(app.appId)"
      />
    </div>
    <ContextMenu ref="ctxMenu" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWindowStore } from '@/stores/windowManager'
import { APP_REGISTRY } from '@/data/apps.config'
import DesktopIcon from './DesktopIcon.vue'
import ContextMenu from './ContextMenu.vue'
import type { AppId } from '@/types'

const winStore    = useWindowStore()
const selectedIcon = ref<AppId | null>(null)
const ctxMenu     = ref<InstanceType<typeof ContextMenu>>()

function onRightClick(e: MouseEvent) {
  ctxMenu.value?.open(e.clientX, e.clientY)
}
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