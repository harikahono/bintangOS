<template>
  <div class="bios-screen">
    <div class="bios-content" ref="scrollEl">
      <p v-for="(line, i) in bootStore.biosLines" :key="i">
        <span :class="lineClass(line)">{{ line }}</span>
      </p>
      <span class="bios-cursor">█</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useBootStore } from '@/stores/boot'

const bootStore = useBootStore()
const scrollEl = ref<HTMLElement>()

watch(() => bootStore.biosLines.length, async () => {
  await nextTick()
  if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
})

function lineClass(line: string) {
  if (line.startsWith('[OK]'))   return 'ok'
  if (line.startsWith('[WARN]')) return 'warn'
  if (line.startsWith('[ERR]'))  return 'err'
  return ''
}
</script>

<style scoped>
.bios-screen {
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  padding: 20px 24px;
  overflow: hidden;
}

.bios-content {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: #c8c8c8;
  overflow-y: auto;
  width: 100%;
}

.ok   { color: #1abc9c; }
.warn { color: #e6ac00; }
.err  { color: #c0392b; }

.bios-cursor {
  display: inline-block;
  color: #c8c8c8;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>