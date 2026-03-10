<template>
  <div class="window-manager">
    <WindowFrame v-for="win in winStore.windows" :key="win.id" :win="win">
      <Terminal    v-if="win.appId === 'terminal'" />
      <FileManager v-else-if="win.appId === 'filemanager'" />
      <ContactTxt  v-else-if="win.appId === 'contact'" />
      <AboutThisPC v-else-if="win.appId === 'about'" />
    </WindowFrame>
  </div>
</template>

<script setup lang="ts">
import { useWindowStore } from '@/stores/windowManager'
import WindowFrame  from './WindowFrame.vue'
import Terminal     from '@/components/apps/Terminal.vue'
import FileManager  from '@/components/apps/FileManager.vue'
import ContactTxt   from '@/components/apps/ContactTxt.vue'
import AboutThisPC  from '@/components/apps/AboutThisPC.vue'

const winStore = useWindowStore()
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