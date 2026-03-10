<template>
  <div class="taskbar">
    <!-- Left: Launcher -->
    <div class="taskbar-left">
      <button class="launcher-btn font-mono" @click.stop="launcherOpen = !launcherOpen">
        ⬛ BintangOS
      </button>
      <Transition name="pop">
        <div v-if="launcherOpen" class="launcher-popup" @click.stop>
          <button
            v-for="app in APP_REGISTRY" :key="app.appId"
            class="launcher-item font-mono"
            @click="openApp(app.appId)"
          >
            {{ app.icon }} {{ app.label }}
          </button>
        </div>
      </Transition>
    </div>

    <!-- Center: Running apps -->
    <div class="taskbar-center">
      <button
        v-for="win in winStore.windows" :key="win.id"
        class="running-app font-mono"
        :class="{ minimized: win.minimized }"
        @click="winStore.minimize(win.id)"
      >
        {{ appIcon(win.appId) }} {{ win.title.split(' —')[0] }}
      </button>
    </div>

    <!-- Right: System tray -->
    <div class="taskbar-right font-mono">
      <span class="tray-item" :title="online ? 'Online' : 'Offline'">
        {{ online ? '🟢' : '🔴' }}
      </span>
      <span class="tray-item">
        {{ batteryIcon() }} {{ batteryLabel() }}
      </span>
      <div class="tray-clock">
        <span class="clock-time">{{ formatTime(now) }}</span>
        <span class="clock-date text-muted">{{ formatDate(now) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWindowStore } from '@/stores/windowManager'
import { useSystemTrayStore } from '@/stores/systemTray'
import { APP_REGISTRY } from '@/data/apps.config'
import type { AppId } from '@/types'

const winStore = useWindowStore()
const tray     = useSystemTrayStore()
const { now, online } = storeToRefs(tray)
const { formatTime, formatDate, batteryIcon, batteryLabel } = tray

const launcherOpen = ref(false)

function openApp(appId: AppId) {
  winStore.open(appId)
  launcherOpen.value = false
}

function appIcon(appId: AppId) {
  return APP_REGISTRY.find(a => a.appId === appId)?.icon ?? '📄'
}

const closeOnClick = () => { launcherOpen.value = false }
document.addEventListener('click', closeOnClick)
onUnmounted(() => document.removeEventListener('click', closeOnClick))
</script>

<style scoped>
.taskbar {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--taskbar-height);
  background: var(--bg-taskbar);
  border-top: 1px solid var(--border-subtle);
  padding: 0 8px;
  gap: 8px;
  flex-shrink: 0;
  z-index: 1000;
}

.taskbar-left, .taskbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.taskbar-center {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
}

.launcher-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(26,188,156,0.1);
  border: 1px solid rgba(26,188,156,0.2);
  border-radius: 4px;
  color: var(--accent-teal);
  font-size: 12px;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.launcher-btn:hover { background: rgba(26,188,156,0.2); }

.launcher-popup {
  position: absolute;
  bottom: calc(var(--taskbar-height) + 4px);
  left: 8px;
  background: var(--bg-panel);
  border: 1px solid var(--border-bright);
  border-radius: 6px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 180px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  z-index: 2000;
}

.launcher-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background var(--transition-fast);
}
.launcher-item:hover { background: rgba(255,255,255,0.06); }

.running-app {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 3px;
  color: var(--text-primary);
  font-size: 11px;
  cursor: pointer;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: background var(--transition-fast);
}
.running-app.minimized { opacity: 0.5; }
.running-app:hover { background: rgba(255,255,255,0.09); }

.tray-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  font-size: 11px;
  color: var(--text-muted);
}

.tray-clock {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 4px;
}

.clock-time { font-size: 12px; color: var(--text-primary); line-height: 1.2; }
.clock-date { font-size: 10px; line-height: 1.2; }

.pop-enter-active, .pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(6px); }
</style>