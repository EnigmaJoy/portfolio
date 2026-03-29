<template>
  <div class="d-flex v-col-6 top-navbar" :style="btnStyle" @click="scrollUp('main')">
    <v-icon icon="mdi-arrow-up" size="24" :color="color" />
  </div>
</template>

<style scoped>

.top-navbar {
  display: flex;
  padding: 8px 16px;
  height: 55px;
  max-width: 60px;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
  border-radius: 22px;
  box-shadow:
      0 6px 25px rgba(0, 0, 0, 0.6),
      inset 0 0 20px rgba(255, 255, 255, 0.03),
      inset 0 0 40px rgba(255, 255, 255, 0.02);
}

</style>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  color: { type: String, default: '#d4944a' },
})

const btnStyle = computed(() => {
  const c = props.color
  return {
    background: `linear-gradient(to bottom right, ${c}18, rgba(42, 24, 53, 0.6))`,
    border: `1px solid ${c}26`,
  }
})

function scrollUp(id) {
  const el = document.getElementById(id)
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' })
}
</script>