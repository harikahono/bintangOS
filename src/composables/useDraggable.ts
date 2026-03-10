import { ref, onUnmounted } from 'vue'

export function useDraggable(
  onMove: (x: number, y: number) => void,
  getInitialPos: () => { x: number; y: number }
) {
  const dragging = ref(false)
  let startMouseX = 0
  let startMouseY = 0
  let startWinX = 0
  let startWinY = 0

  function onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return
    e.preventDefault()
    dragging.value = true
    startMouseX = e.clientX
    startMouseY = e.clientY
    const pos = getInitialPos()
    startWinX = pos.x
    startWinY = pos.y
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging.value) return
    const dx = e.clientX - startMouseX
    const dy = e.clientY - startMouseY
    onMove(Math.max(0, startWinX + dx), Math.max(0, startWinY + dy))
  }

  function onMouseUp() {
    dragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return { onMouseDown, dragging }
}