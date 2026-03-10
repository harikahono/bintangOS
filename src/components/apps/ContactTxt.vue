<template>
  <div class="contact-editor">
    <div class="editor-toolbar font-mono">
      <span class="text-muted">contact.txt</span>
      <span class="badge text-dim">READ ONLY</span>
    </div>
    <pre class="editor-body font-mono">{{ content }}</pre>
  </div>
</template>

<script setup lang="ts">
import contact from '@/data/contact.json'

const content = `# contact.txt
# ────────────────────────────────────

name     :  ${contact.name} (${contact.handle})
github   :  ${contact.github}
email    :  ${contact.email}
linkedin :  ${contact.linkedin}
web      :  ${contact.website}

# ────────────────────────────────────
# "${contact.note}"
`
</script>

<style scoped>
.contact-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #080808;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  background: #111;
  border-bottom: 1px solid #1e1e1e;
  font-size: 11px;
  flex-shrink: 0;
}

.badge {
  font-size: 10px;
  padding: 1px 6px;
  border: 1px solid #2a2a2a;
  border-radius: 2px;
}

.editor-body {
  flex: 1;
  padding: 16px;
  font-size: 12.5px;
  line-height: 1.8;
  color: #bbb;
  white-space: pre;
  overflow: auto;
}
</style>