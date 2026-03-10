<template>
  <div id="os" class="crt-flicker">
    <div class="crt-overlay"></div>
    <Transition name="fade" mode="out-in">
      <BiosScreen   v-if="bootStore.phase === 'bios'"    key="bios" />
      <SplashScreen v-else-if="bootStore.phase === 'splash'" key="splash" />
      <LoginScreen  v-else-if="bootStore.phase === 'login'"  key="login" />
      <div v-else-if="bootStore.phase === 'desktop'" key="desktop" class="desktop-shell">
        <Desktop />
        <WindowManager />
        <Taskbar />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBootStore } from '@/stores/boot'
import BiosScreen    from '@/components/boot/BiosScreen.vue'
import SplashScreen  from '@/components/boot/SplashScreen.vue'
import LoginScreen   from '@/components/boot/LoginScreen.vue'
import Desktop       from '@/components/desktop/Desktop.vue'
import WindowManager from '@/components/window/WindowManager.vue'
import Taskbar       from '@/components/taskbar/Taskbar.vue'

const bootStore = useBootStore()

onMounted(() => {
  ;(window as any).__bootTime = Date.now()
  bootStore.startBoot()
})
</script>

<style scoped>
#os {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.desktop-shell {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,   .fade-leave-to     { opacity: 0; }
</style>