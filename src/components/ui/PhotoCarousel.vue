<template>
  <div
    ref="carouselRef"
    class="carousel"
    :class="{ vertical: isMobile }"
    @contextmenu.prevent
    @mouseenter="paused = true"
    @mouseleave="paused = false; hoveredIndex = -1"
  >
    <!-- Nav: Left / Up -->
    <button class="nav-btn nav-prev" :style="navStyle" @click="nudge(-1)">
      <v-icon :icon="isMobile ? 'mdi-chevron-up' : 'mdi-chevron-left'" size="28" color="white" />
    </button>

    <div class="track-wrapper">
      <div
        ref="trackRef"
        class="track"
        :style="trackTransform"
        @mousedown="onDragStart"
        @touchstart.passive="onDragStart"
      >
        <div
          v-for="(img, i) in doubledImages"
          :key="i"
          class="slide"
          :class="{ hovered: hoveredIndex === i }"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = -1"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            draggable="false"
            @dragstart.prevent
          />
          <div class="watermark">{{ watermarkText }}</div>
        </div>
      </div>
    </div>

    <!-- Nav: Right / Down -->
    <button class="nav-btn nav-next" :style="navStyle" @click="nudge(1)">
      <v-icon :icon="isMobile ? 'mdi-chevron-down' : 'mdi-chevron-right'" size="28" color="white" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      { src: '/portfolio/photographies/1.JPG', alt: 'Photo 1' },
      { src: '/portfolio/photographies/2.JPG', alt: 'Photo 2' },
      { src: '/portfolio/photographies/3.JPG', alt: 'Photo 3' },
      { src: '/portfolio/photographies/4.JPG', alt: 'Photo 4' },
      { src: '/portfolio/photographies/5.JPG', alt: 'Photo 5' },
      { src: '/portfolio/photographies/6.JPG', alt: 'Photo 6' },
      { src: '/portfolio/photographies/7.JPG', alt: 'Photo 7' },
      { src: '/portfolio/photographies/8.JPG', alt: 'Photo 8' },
      { src: '/portfolio/photographies/9.JPG', alt: 'Photo 9' },
      { src: '/portfolio/photographies/10.JPG', alt: 'Photo 10' },
      { src: '/portfolio/photographies/11.jpg', alt: 'Photo 11' },
      { src: '/portfolio/photographies/12.JPG', alt: 'Photo 12' },
      { src: '/portfolio/photographies/13.JPG', alt: 'Photo 13' },
    ],
  },
  scrollSpeed: { type: Number, default: 0.5 },
  watermarkText: { type: String, default: '© Joselyn Grace Gordillo Lopez' },
  accentColor: { type: String, default: '#5a9ec4' },
})

const carouselRef = ref(null)
const trackRef = ref(null)
const offset = ref(0)
const paused = ref(false)
const hoveredIndex = ref(-1)
const isMobile = ref(false)
const dragging = ref(false)

// Drag state
let dragStart = 0
let dragOffset = 0
let rafId = null

// Slide dimensions
const SLIDE_W = 280
const SLIDE_GAP = 16
const MOBILE_H = 180

const doubledImages = computed(() => [...props.images, ...props.images])

const singleSetSize = computed(() => {
  const count = props.images.length
  if (isMobile.value) {
    return count * (MOBILE_H + SLIDE_GAP)
  }
  return count * (SLIDE_W + SLIDE_GAP)
})

const trackTransform = computed(() => {
  const axis = isMobile.value ? 'Y' : 'X'
  return { transform: `translate${axis}(${-offset.value}px)` }
})

const navStyle = computed(() => {
  const c = props.accentColor
  return {
    background: `linear-gradient(to bottom right, ${c}30, rgba(42, 24, 53, 0.6))`,
    border: `1px solid ${c}40`,
  }
})

function checkMobile() {
  isMobile.value = window.innerWidth <= 600
}

// Auto-scroll animation loop
function animate() {
  if (!paused.value && !dragging.value) {
    offset.value += props.scrollSpeed
    if (offset.value >= singleSetSize.value) {
      offset.value -= singleSetSize.value
    }
  }
  rafId = requestAnimationFrame(animate)
}

// Nudge by one slide
function nudge(dir) {
  const step = isMobile.value ? MOBILE_H + SLIDE_GAP : SLIDE_W + SLIDE_GAP
  offset.value += dir * step
  if (offset.value < 0) {
    offset.value += singleSetSize.value
  } else if (offset.value >= singleSetSize.value) {
    offset.value -= singleSetSize.value
  }
}

// Drag handling
function onDragStart(e) {
  dragging.value = true
  const pos = e.touches ? e.touches[0] : e
  dragStart = isMobile.value ? pos.clientY : pos.clientX
  dragOffset = offset.value

  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onDragMove, { passive: true })
  window.addEventListener('touchend', onDragEnd)
}

function onDragMove(e) {
  if (!dragging.value) return
  const pos = e.touches ? e.touches[0] : e
  const current = isMobile.value ? pos.clientY : pos.clientX
  const delta = dragStart - current
  let newOffset = dragOffset + delta

  if (newOffset < 0) {
    newOffset += singleSetSize.value
  } else if (newOffset >= singleSetSize.value) {
    newOffset -= singleSetSize.value
  }
  offset.value = newOffset
}

function onDragEnd() {
  dragging.value = false
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchmove', onDragMove)
  window.removeEventListener('touchend', onDragEnd)
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  rafId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  padding: 8px 0;
}

.carousel.vertical {
  flex-direction: column;
  height: 400px;
}

.track-wrapper {
  flex: 1;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
}

.track {
  display: flex;
  gap: 16px;
  will-change: transform;
}

.carousel.vertical .track {
  flex-direction: column;
}

.slide {
  position: relative;
  flex-shrink: 0;
  width: 280px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: grab;
}

.slide:active {
  cursor: grabbing;
}

.slide.hovered {
  transform: scale(1.05);
  z-index: 2;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
}

.watermark {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 10px;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.45);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.35));
  text-align: center;
  pointer-events: none;
  letter-spacing: 0.05em;
}

.nav-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
  box-shadow:
    0 6px 25px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.03),
    inset 0 0 40px rgba(255, 255, 255, 0.02);
  transition: opacity 0.2s;
  z-index: 3;
}

.nav-btn:hover {
  opacity: 0.85;
}

/* Mobile ≤ 600px — vertical carousel */
@media (max-width: 600px) {
  .carousel.vertical {
    height: 360px;
  }

  .slide {
    width: 100%;
    height: 180px;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
  }
}

/* Tablet 601–768px — horizontal, diapositive alte */
@media (min-width: 601px) and (max-width: 768px) {
  .slide {
    width: clamp(200px, 28vw, 280px);
    height: clamp(260px, 38vh, 380px);
  }
}
</style>
