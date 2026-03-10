<template>
  <div class="terminal" @click="inputEl?.focus()">
    <div class="terminal-output" ref="outputEl">
      <template v-for="(line, i) in term.lines.value" :key="i">

        <div v-if="line.type === 'neofetch'" class="neofetch-row">
          <pre class="ascii-photo">{{ parseNeofetch(line.content).photo.join('\n') }}</pre>
          <div class="neofetch-info">
            <p class="neofetch-name font-mono">
              <span class="text-teal">bintang</span>@<span class="text-teal">bintangos</span>
            </p>
            <p class="neofetch-sep font-mono">─────────────────────────</p>
            <p v-for="info in parseNeofetch(line.content).info" :key="info" class="neofetch-item font-mono">
              <span class="info-key text-teal">{{ info.split(':')[0] ?? '' }}:</span>
              <span class="info-val">{{ info.split(':').slice(1).join(':') ?? '' }}</span>
            </p>
          </div>
        </div>

        <div v-else-if="line.type === 'input'" class="line font-mono">
          <span class="prompt"><span class="text-teal">bintang@bintangos</span> ~ $ </span>{{ line.content }}
        </div>
        <div v-else-if="line.type === 'error'" class="line error-line font-mono">{{ line.content }}</div>
        <div v-else-if="line.type === 'blank'" class="line"></div>
        <div v-else class="line output-line font-mono">{{ line.content }}</div>

      </template>
    </div>

    <div class="terminal-input-row font-mono">
      <span class="prompt"><span class="text-teal">bintang@bintangos</span> ~ $ </span>
      <input
        ref="inputEl"
        v-model="currentInput"
        class="terminal-input"
        @keydown.enter="submit"
        @keydown.up.prevent="historyUp"
        @keydown.down.prevent="historyDown"
        @keydown.tab.prevent="tabComplete"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { useTerminal } from '@/composables/useTerminal'

const term = useTerminal()
const outputEl  = ref<HTMLElement>()
const inputEl   = ref<HTMLInputElement>()
const currentInput = ref('')
const history   = ref<string[]>([])
const historyIdx = ref(-1)

const CMDS = ['help', 'whoami', 'ls projects/', 'ls music/', 'cat contact.txt', 'neofetch', 'uname -a', 'clear', 'sudo rm -rf /', 'ping bintang']

function parseNeofetch(content: string) {
  const data = JSON.parse(content)
  return data as { photo: string[], info: string[] }
}

function submit() {
  const cmd = currentInput.value
  history.value.unshift(cmd)
  historyIdx.value = -1
  term.execute(cmd)
  currentInput.value = ''
  scrollBottom()
}

function historyUp() {
  if (historyIdx.value < history.value.length - 1) {
    historyIdx.value++
    currentInput.value = history.value[historyIdx.value]!
  }
}

function historyDown() {
  if (historyIdx.value > 0) {
    historyIdx.value--
    currentInput.value = history.value[historyIdx.value]!
  } else {
    historyIdx.value = -1
    currentInput.value = ''
  }
}

function tabComplete() {
  const match = CMDS.find(c => c.startsWith(currentInput.value))
  if (match) currentInput.value = match
}

async function scrollBottom() {
  await nextTick()
  if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight
}

watch(() => term.lines.value.length, scrollBottom)
onMounted(() => { inputEl.value?.focus(); scrollBottom() })
</script>

<style scoped>
.terminal {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #0a0a0a;
  color: #c8c8c8;
  cursor: text;
}

.terminal-output {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px 4px;
  font-size: 12.5px;
  line-height: 1.6;
}

.line { min-height: 1.6em; }
.error-line  { color: var(--accent-red); }
.output-line { color: #aaa; }
.prompt      { color: var(--text-muted); }

.neofetch-row {
  display: flex;
  gap: 24px;
  margin: 8px 0;
}

.ascii-photo {
  font-size: 7px;
  line-height: 1.2;
  color: var(--accent-teal);
  flex-shrink: 0;
  white-space: pre;
  overflow: hidden;
}

.neofetch-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 4px;
}

.neofetch-name { font-size: 14px; font-weight: bold; }
.neofetch-sep  { color: var(--text-dim); font-size: 11px; margin: 2px 0; }
.neofetch-item { font-size: 12px; color: #bbb; }
.info-key      { min-width: 120px; display: inline-block; }

.terminal-input-row {
  display: flex;
  align-items: center;
  padding: 6px 16px 10px;
  font-size: 12.5px;
  border-top: 1px solid #111;
  flex-shrink: 0;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e0e0e0;
  font-family: var(--font-mono);
  font-size: 12.5px;
  caret-color: var(--accent-teal);
}
</style>