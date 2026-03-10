<template>
  <div
    class="window-frame"
    :class="{ maximized: win.maximized, minimized: win.minimized }"
    :style="windowStyle"
    @mousedown="winStore.focus(win.id)"
  >
    <div
      class="titlebar"
      @mousedown.stop="drag.onMouseDown($event)"
      @dblclick="winStore.toggleMaximize(win.id)"
    >
      <div class="titlebar-buttons">
        <button class="btn-close" @click.stop="winStore.close(win.id)">×</button>
        <button class="btn-min"   @click.stop="winStore.minimize(win.id)">−</button>
        <button class="btn-max"   @click.stop="winStore.toggleMaximize(win.id)">+</button>
      </div>
      <span class="titlebar-title font-mono">{{ win.title }}</span>
    </div>
    <div class="window-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WindowState } from '@/types'
import { useWindowStore } from '@/stores/windowManager'
import { useDraggable } from '@/composables/useDraggable'

const props = defineProps<{ win: WindowState }>()
const winStore = useWindowStore()

const drag = useDraggable(
  (x, y) => {
    if (!props.win.maximized) winStore.move(props.win.id, x, y)
  },
  () => ({ x: props.win.x, y: props.win.y })
)

const windowStyle = computed(() => {
  if (props.win.maximized) {
    return { left: '0px', top: '0px', width: '100%', height: `calc(100% - var(--taskbar-height))`, zIndex: props.win.zIndex }
  }
  return {
    left:   props.win.x + 'px',
    top:    props.win.y + 'px',
    width:  props.win.width + 'px',
    height: props.win.height + 'px',
    zIndex: props.win.zIndex,
  }
})
</script>

<style scoped>
.window-frame {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: var(--bg-window);
  border: 1px solid var(--window-border);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
}

.window-frame.minimized  { display: none; }
.window-frame.maximized  { border-radius: 0; border: none; }
.window-frame.maximized .titlebar {
  cursor: default;
}

.titlebar {
  display: flex;
  align-items: center;
  height: 32px;
  background: var(--window-titlebar);
  border-bottom: 1px solid var(--window-border);
  padding: 0 10px;
  cursor: move;
  flex-shrink: 0;
  gap: 10px;
}

.titlebar-buttons {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.titlebar-buttons button {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.titlebar:hover .titlebar-buttons button { opacity: 1; }

.btn-close { background: var(--window-btn-close); color: #600; }
.btn-min   { background: var(--window-btn-min);   color: #640; }
.btn-max   { background: var(--window-btn-max);   color: #064; }

.titlebar-title {
  font-size: 12px;
  color: var(--text-muted);
  flex: 1;
  text-align: center;
  pointer-events: none;
}

.window-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>