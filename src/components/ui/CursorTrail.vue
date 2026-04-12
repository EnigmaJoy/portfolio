<template>
  <canvas ref="canvas" class="cursor-trail"></canvas>
</template>

<style scoped>
.cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  section: { type: String, default: 'main' }
})

// color palettes per section: [outer, mid, bright, particle, particleHalo, glowCenter, glowMid]
const palettes = {
  main: {
    outer:     [180, 110, 45],
    mid:       [196, 122, 48],
    bright:    [220, 160, 80],
    particle:  [210, 145, 65],
    halo:      [196, 122, 48],
    glow:      [220, 160, 80],
    glowMid:   [196, 122, 48],
  },
  welcome: {
    outer:     [100, 70, 180],
    mid:       [130, 90, 200],
    bright:    [170, 140, 230],
    particle:  [150, 120, 210],
    halo:      [120, 80, 190],
    glow:      [160, 130, 220],
    glowMid:   [120, 80, 190],
  },
  about: {
    outer:     [40, 100, 180],
    mid:       [52, 130, 200],
    bright:    [90, 170, 230],
    particle:  [70, 150, 210],
    halo:      [52, 120, 190],
    glow:      [80, 160, 220],
    glowMid:   [52, 120, 190],
  },
  projects: {
    outer:     [170, 40, 70],
    mid:       [190, 50, 85],
    bright:    [220, 100, 130],
    particle:  [200, 70, 100],
    halo:      [180, 45, 75],
    glow:      [210, 90, 120],
    glowMid:   [180, 45, 75],
  },
  contact: {
    outer:     [160, 120, 45],
    mid:       [180, 140, 55],
    bright:    [210, 175, 90],
    particle:  [190, 155, 70],
    halo:      [170, 130, 50],
    glow:      [200, 165, 80],
    glowMid:   [170, 130, 50],
  },
}

// smooth color transition
let currentColor = { ...palettes.main }
let targetColor = { ...palettes.main }
const colorLerp = 0.04

function lerpRgb(curr, target, t) {
  return [
    curr[0] + (target[0] - curr[0]) * t,
    curr[1] + (target[1] - curr[1]) * t,
    curr[2] + (target[2] - curr[2]) * t,
  ]
}

function rgb(c, a) {
  return `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${a})`
}

watch(() => props.section, (s) => {
  targetColor = { ...(palettes[s] || palettes.main) }
})

const canvas = ref(null)
let ctx = null
let animId = null

// trail spine points
let trail = []
let maxTrail = 80
const fadeSpeed = 0.005

// particles scattered around the trail
let particles = []
let maxParticles = 600

let mouseX = 0
let mouseY = 0

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
}

function onTouchStart(e) {
  const t = e.touches[0]
  if (!t) return
  mouseX = t.clientX
  mouseY = t.clientY
}

function onTouchMove(e) {
  const t = e.touches[0]
  if (!t) return
  mouseX = t.clientX
  mouseY = t.clientY
}

function draw() {
  if (!ctx || !canvas.value) return
  const w = canvas.value.width
  const h = canvas.value.height
  ctx.clearRect(0, 0, w, h)

  // transition colors smoothly
  for (const key of Object.keys(currentColor)) {
    currentColor[key] = lerpRgb(currentColor[key], targetColor[key], colorLerp)
  }
  const c = currentColor

  // add trail point at cursor
  const last = trail[trail.length - 1]
  const speed = last ? Math.hypot(mouseX - last.x, mouseY - last.y) : 0
  if (!last || speed > 1) {
    trail.push({ x: mouseX, y: mouseY, alpha: 1 })
    if (trail.length > maxTrail) trail.shift()

    // spawn particles along the trail — more when moving fast
    const count = Math.min(Math.floor(speed * 0.8), 12)
    for (let j = 0; j < count; j++) {
      const spread = 40 + speed * 0.5
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * spread
      particles.push({
        x: mouseX + Math.cos(angle) * dist,
        y: mouseY + Math.sin(angle) * dist,
        alpha: 0.3 + Math.random() * 0.4,
        size: 0.5 + Math.random() * 1.5,
        life: 1,
        decay: 0.003 + Math.random() * 0.006,
      })
    }
  }

  // cap particles
  if (particles.length > maxParticles) {
    particles = particles.slice(particles.length - maxParticles)
  }

  // fade trail
  for (const p of trail) p.alpha -= fadeSpeed
  trail = trail.filter(p => p.alpha > 0)

  // draw wide diffused glow along trail (the soft wave)
  if (trail.length > 2) {
    const len = trail.length
    for (let i = 1; i < len; i++) {
      const prev = trail[i - 1]
      const curr = trail[i]
      const t = i / (len - 1)
      const taper = t * t

      // very wide, very soft outer glow
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(curr.x, curr.y)
      ctx.strokeStyle = rgb(c.outer, taper * curr.alpha * 0.04)
      ctx.lineWidth = 60 * taper + 2
      ctx.lineCap = 'round'
      ctx.stroke()

      // medium glow
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(curr.x, curr.y)
      ctx.strokeStyle = rgb(c.mid, taper * curr.alpha * 0.06)
      ctx.lineWidth = 30 * taper + 1
      ctx.lineCap = 'round'
      ctx.stroke()

      // soft bright center
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(curr.x, curr.y)
      ctx.strokeStyle = rgb(c.bright, taper * curr.alpha * 0.08)
      ctx.lineWidth = 8 * taper + 0.5
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  }

  // draw particles — scattered glowing dust
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.life -= p.decay
    if (p.life <= 0) {
      particles.splice(i, 1)
      continue
    }

    const a = p.life * p.alpha
    // particle dot
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = rgb(c.particle, a * 0.5)
    ctx.fill()

    // soft halo around particle
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
    ctx.fillStyle = rgb(c.halo, a * 0.06)
    ctx.fill()
  }

  // soft glow at cursor
  const grd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50)
  grd.addColorStop(0, rgb(c.glow, 0.08))
  grd.addColorStop(0.3, rgb(c.glowMid, 0.03))
  grd.addColorStop(1, rgb(c.glowMid, 0))
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2)
  ctx.fill()

  animId = requestAnimationFrame(draw)
}

function onVisibilityChange() {
  if (document.hidden) {
    if (animId) cancelAnimationFrame(animId)
  } else {
    animId = requestAnimationFrame(draw)
  }
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  mouseX = window.innerWidth / 2
  mouseY = window.innerHeight / 2

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouch) {
    maxTrail = 40
    maxParticles = 150
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVisibilityChange)
  animId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  if (animId) cancelAnimationFrame(animId)
})
</script>