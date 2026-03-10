<template>
  <Transition name="ctx">
    <div
      v-if="visible"
      class="ctx-menu font-mono"
      :style="{ left: x + 'px', top: y + 'px' }"
      @click.stop
    >
      <button
        v-for="item in items" :key="item.label"
        class="ctx-item"
        :class="{ divider: item.divider }"
        @click="item.action(); close()"
      >
        <span class="ctx-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowStore } from '@/stores/windowManager'
import type { AppId } from '@/types'

const winStore = useWindowStore()

const visible = ref(false)
const x       = ref(0)
const y       = ref(0)

const items = [
  { icon: '⬛', label: 'Open Terminal',     divider: false, action: () => winStore.open('terminal' as AppId) },
  { icon: '📁', label: 'Open Files',        divider: false, action: () => winStore.open('filemanager' as AppId) },
  { icon: '📄', label: 'Open contact.txt',  divider: false, action: () => winStore.open('contact' as AppId) },
  { icon: '💻', label: 'About This PC',     divider: true,  action: () => winStore.open('about' as AppId) },
  { icon: '🔄', label: 'Reload Desktop',    divider: false, action: () => window.location.reload() },
]

function open(ex: number, ey: number) {
  // Boundary check supaya menu ga keluar viewport
  const menuW = 200
  const menuH = items.length * 34
  x.value = ex + menuW > window.innerWidth  ? ex - menuW : ex
  y.value = ey + menuH > window.innerHeight ? ey - menuH : ey
  visible.value = true
}

function close() {
  visible.value = false
}

const onClickOutside = () => close()
const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }

onMounted(() => {
  document.addEventListener('click',   onClickOutside)
  document.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
  document.removeEventListener('click',   onClickOutside)
  document.removeEventListener('keydown', onEsc)
})

defineExpose({ open, close })
</script>

<style scoped>
.ctx-menu {
  position: fixed;
  background: var(--bg-panel);
  border: 1px solid var(--border-bright);
  border-radius: 6px;
  padding: 4px;
  min-width: 200px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.6);
  z-index: 9999;
}

.ctx-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 6px 12px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background var(--transition-fast);
  position: relative;
}
.ctx-item:hover { background: rgba(255,255,255,0.07); }

.ctx-item.divider {
  margin-top: 4px;
}
.ctx-item.divider::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 8px;
  right: 8px;
  height: 1px;
  background: var(--border-subtle);
}

.ctx-icon { font-size: 13px; width: 18px; }

.ctx-enter-active, .ctx-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.ctx-enter-from, .ctx-leave-to { opacity: 0; transform: scale(0.95); }
</style>