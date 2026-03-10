<template>
  <div class="window-manager">
    <WindowFrame v-for="win in winStore.windows" :key="win.id" :win="win">
      <component :is="APP_COMPONENTS[win.appId]" />
    </WindowFrame>
  </div>
</template>

<script setup lang="ts">
import { useWindowStore } from '@/stores/windowManager'
import type { AppId } from '@/types'
import WindowFrame  from './WindowFrame.vue'
import Terminal     from '@/components/apps/Terminal.vue'
import FileManager  from '@/components/apps/FileManager.vue'
import ContactTxt   from '@/components/apps/ContactTxt.vue'
import AboutThisPC  from '@/components/apps/AboutThisPC.vue'

const winStore = useWindowStore()

const APP_COMPONENTS: Record<AppId, unknown> = {
  terminal:    Terminal,
  filemanager: FileManager,
  contact:     ContactTxt,
  about:       AboutThisPC,
}
</script>

<style scoped>
.window-manager {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.window-manager > * {
  pointer-events: all;
}
</style>