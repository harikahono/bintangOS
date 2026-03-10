import { ref } from 'vue'
import projects from '@/data/projects.json'
import music from '@/data/music.json'
import contact from '@/data/contact.json'
import quotes from '@/data/quotes.json'
import asciiPhoto from '@/assets/ascii/photo.txt?raw'   // ← baru

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'neofetch' | 'blank'
  content: string
}

// Helper type-safe untuk random item
const getRandomItem = <T>(arr: readonly T[]): T => {
  if (arr.length === 0) throw new Error('Array quotes kosong!')
  return arr[Math.floor(Math.random() * arr.length)]!
}

const NEOFETCH_INFO = () => [
  `OS:         BintangOS v1.0 (Arch-based, apparently)`,
  `Host:       harikahono.dev`,
  `Kernel:     bintang-core 5.x.x-CUSTOM`,
  `Uptime:     ${Math.floor((Date.now() - ((window as any).__bootTime ?? Date.now())) / 60000)}m`,
  `Packages:   ${projects.length} (projects)`,
  `Shell:      bsh 3.0.1`,
  `Resolution: ${screen.width}x${screen.height}`,
  `DE:         BintangDE / Evangelion Edition`,
  `WM:         bwm (Bintang Window Manager)`,
  `Theme:      NGE Dark [GTK3]`,
  `CPU:        Intel i9-BintangU @ ∞ GHz`,
  `RAM:        ∞ MB Creativity`,
]

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '  whoami          — who am i',
    '  ls projects/    — list all projects',
    '  ls music/       — my playlist',
    '  cat contact.txt — contact info',
    '  neofetch        — system info',
    '  uname -a        — os details',
    '  clear           — clear terminal',
    '  sudo rm -rf /   — (try it)',
    '  ping bintang    — ping me',
    '',
  ],
  whoami: () => [
    'bintang — Teknik Informatika @ ITI',
    'Frontend / Fullstack dev.',
    'Stack: Vue 3 · TypeScript · Laravel · Tauri · Flutter',
    'Currently building: SEIRIS (TA) + BintangOS (this site)',
    'Status: all i want is revenge',
    '',
  ],
  'ls projects/': () => [
    'total 6',
    ...projects.map(p =>
      `${p.featured ? '★' : ' '} ${p.id.padEnd(20)} ${p.type.padEnd(14)} ${p.stack.slice(0,2).join(', ')}`
    ),
    '',
  ],
  'ls music/': () => [
    'Now in rotation:',
    ...music.map(m => `  ${m.artist.padEnd(20)} — ${m.album} (${m.year})`),
    '',
  ],
  'cat contact.txt': () => [
    '# contact.txt',
    `name   : ${contact.name} (${contact.handle})`,
    `github : ${contact.github}`,
    `email  : ${contact.email}`,
    `web    : ${contact.website}`,
    '',
    `"${contact.note}"`,
    '',
  ],
  'uname -a': () => [
    'BintangOS bintang-core 5.x.x-CUSTOM #1 SMP x86_64 GNU/Linux',
    '',
  ],
  'sudo rm -rf /': () => ['Permission denied. Nice try.', ''],
  'ping bintang': () => [
    'PING bintang (127.0.0.1)',
    `64 bytes: icmp_seq=1 ttl=64 time=∞ ms`,
    getRandomItem(quotes),
    '',
  ],
}

export function useTerminal() {
  const lines = ref<TerminalLine[]>([
    { type: 'output', content: 'BintangOS v1.0 — Type "help" for available commands.' },
    { type: 'blank',  content: '' },
  ])

  function runNeofetch() {
    lines.value.push({
      type: 'neofetch',
      content: JSON.stringify({
        photo: asciiPhoto.split('\n'),
        info: NEOFETCH_INFO()
      })
    })
    lines.value.push({ type: 'blank', content: '' })
  }

  function execute(input: string) {
    const cmd = input.trim().toLowerCase()
    lines.value.push({ type: 'input', content: input })
    if (!cmd) return
    if (cmd === 'clear') { lines.value = []; return }
    if (cmd === 'neofetch') { runNeofetch(); return }
    const handler = COMMANDS[cmd]
    if (handler) {
      handler().forEach(l => lines.value.push({ type: 'output', content: l }))
    } else {
      lines.value.push({ type: 'error', content: `bsh: command not found: ${input}` })
      lines.value.push({ type: 'blank', content: '' })
    }
  }

  runNeofetch()

  return { lines, execute }
}