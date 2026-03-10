<template>
  <div
    class="desktop-icon"
    :class="{ selected }"
    @click.stop="emit('select')"
    @dblclick.stop="emit('open')"
  >
    <div class="icon-img">{{ icon.icon }}</div>
    <div class="icon-label font-mono">{{ icon.label }}</div>
  </div>
</template>

<script setup lang="ts">
import type { AppMeta } from '@/data/apps.config'

defineProps<{
  icon: AppMeta
  selected: boolean
}>()

const emit = defineEmits<{
  select: []
  open: []
}>()
</script>

<style scoped>
.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 72px;
  text-align: center;
  transition: background var(--transition-fast);
}

.desktop-icon:hover {
  background: rgba(255,255,255,0.07);
}

.desktop-icon.selected {
  background: rgba(26,188,156,0.15);
  outline: 1px solid rgba(26,188,156,0.4);
}

.icon-img {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
}

.icon-label {
  font-size: 10.5px;
  color: #e8e8e8;
  text-shadow: 0 1px 3px rgba(0,0,0,0.9);
  word-break: break-word;
  line-height: 1.3;
}
</style>