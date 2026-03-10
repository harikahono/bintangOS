<template>
  <div class="splash" @click="bootStore.skipBoot()" tabindex="0" @keydown.esc="bootStore.skipBoot()" ref="splashEl">
    <div class="splash-inner">
      <img src="/bintangos.webp" alt="BintangOS" class="amp-logo" />
      <div class="progress-wrap">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: bootStore.splashProgress + '%' }"></div>
        </div>
        <p class="progress-msg font-mono">{{ bootStore.getSplashMessage() }}</p>
      </div>
    </div>
    <span class="skip-hint font-mono">ESC / click to skip</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBootStore } from '@/stores/boot'

const bootStore = useBootStore()
const splashEl  = ref<HTMLElement>()

onMounted(() => splashEl.value?.focus())
</script>

<style scoped>
.splash {
  width: 100%;
  height: 100%;
  background: var(--bg-deepest);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  position: relative;
}

.splash-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  flex: 1;
  justify-content: center;
}

.amp-logo {
  width: 320px;
  max-width: 80vw;
  filter: drop-shadow(0 0 24px rgba(26, 188, 156, 0.3));
  animation: amp-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes amp-in {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.progress-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 320px;
}

.progress-bar {
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-teal);
  border-radius: 2px;
  transition: width 60ms linear;
  box-shadow: 0 0 8px var(--accent-teal);
}

.progress-msg {
  font-size: 11px;
  color: var(--text-dim);
  letter-spacing: 0.05em;
}

.skip-hint {
  font-size: 10px;
  color: #444;
  padding-bottom: 16px;
  flex-shrink: 0;
}
</style>