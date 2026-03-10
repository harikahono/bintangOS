<template>
  <div class="about">
    <div class="about-logo">B</div>
    <h2 class="about-title font-mono text-teal">BintangOS</h2>
    <p class="about-version text-muted font-mono">Version 1.0.0 (Not a real OS)</p>
    <div class="about-divider"></div>
    <div class="specs font-mono">
      <div v-for="row in specs" :key="row.label" class="spec-row">
        <span class="spec-label text-muted">{{ row.label }}</span>
        <span class="spec-val">{{ row.value }}</span>
      </div>
    </div>
    <p class="about-footer text-dim font-mono">Built by harikahono · 2026</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const uptime = computed(() => {
  const ms = Date.now() - ((window as any).__bootTime ?? Date.now())
  const m  = Math.floor(ms / 60000)
  const s  = Math.floor((ms % 60000) / 1000)
  return `${m}m ${s}s`
})

const specs = computed(() => [
  { label: 'OS',      value: 'BintangOS v1.0 (harikahono Edition)' },
  { label: 'CPU',     value: 'Intel i9-BintangU @ ∞ GHz' },
  { label: 'RAM',     value: '∞ MB Creativity / 8GB DDR4' },
  { label: 'Storage', value: 'Too many unfinished projects / 512GB SSD' },
  { label: 'GPU',     value: 'Imagination Engine 3090 Ti' },
  { label: 'Display', value: `${screen.width} × ${screen.height}` },
  { label: 'Theme',   value: 'NGE Dark / Evangelion Edition' },
  { label: 'Uptime',  value: uptime.value },
])
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px;
  gap: 10px;
  height: 100%;
  background: var(--bg-window);
  overflow-y: auto;
}

.about-logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-purple), var(--accent-teal));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.about-title   { font-size: 18px; }
.about-version { font-size: 11px; }

.about-divider {
  width: 100%;
  height: 1px;
  background: var(--border-subtle);
  margin: 4px 0;
}

.specs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.spec-row {
  display: flex;
  gap: 12px;
  font-size: 11.5px;
}

.spec-label { min-width: 80px; flex-shrink: 0; }
.spec-val   { color: var(--text-primary); }

.about-footer { font-size: 10px; margin-top: auto; }
</style>