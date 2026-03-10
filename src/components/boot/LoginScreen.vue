<template>
  <div class="login" @click="doLogin" @keydown.enter="doLogin" tabindex="0" ref="loginEl">
    <div class="login-box">
      <div class="avatar">B</div>
      <p class="username font-mono">bintang</p>
      <p class="quote font-mono">{{ randomQuote }}</p>
      <p class="hint text-muted font-mono">click to continue →</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useBootStore } from '@/stores/boot'
import quotes from '@/data/quotes.json'

const bootStore   = useBootStore()
const loginEl     = ref<HTMLElement>()
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)] ?? ''
let   timer: ReturnType<typeof setTimeout> | null = null
let   loggedIn = false

function doLogin() {
  if (loggedIn) return
  loggedIn = true
  if (timer) clearTimeout(timer)
  bootStore.login()
}

onMounted(() => {
  loginEl.value?.focus()
  timer = setTimeout(doLogin, 2000)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: var(--bg-deepest);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
}

.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: fade-in 0.5s ease forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-teal));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
  box-shadow: 0 0 32px rgba(26, 188, 156, 0.3);
}

.username {
  font-size: 18px;
  color: var(--text-primary);
  letter-spacing: 0.1em;
}

.quote {
  font-size: 11px;
  color: var(--text-dim);
  max-width: 280px;
  text-align: center;
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.hint {
  font-size: 12px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}
</style>