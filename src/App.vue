<template>
    <CursorTrail :section="activeSection"/>
    <HomePage id="main"/>
    <WelcomeAll id="welcome" class="page-bg-7"/>
    <AboutMe id="about" class="page-bg-3"/>
    <PersonalProjects id="projects" class="page-bg-5"/>
    <ContactMe id="contact" class="page-bg-6"/>
    <Transition name="fade">
        <MainButton
            v-if="activeSection !== 'main'"
            :color="currentColor"
            style="position: fixed; top: 20px; right: 20px; z-index: 1000;"
        />
    </Transition>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HomePage from "@/views/HomePage.vue"
import AboutMe from "@/views/AboutMe.vue"
import ContactMe from "@/views/ContactMe.vue"
import PersonalProjects from "@/views/personalProjects.vue"
import WelcomeAll from "@/views/welcomeAll.vue"
import CursorTrail from "@/components/ui/CursorTrail.vue"
import MainButton from "@/components/ui/mainButton.vue"

const activeSection = ref('main')
const sectionColors = {
  welcome:  '#9b80d4',
  about:    '#5a9ec4',
  projects: '#c45a78',
  contact:  '#c4a055',
}
const currentColor = computed(() => sectionColors[activeSection.value] ?? '#d4944a')
let observer = null

onMounted(() => {
  const sections = document.querySelectorAll('#main, #welcome, #about, #projects, #contact')
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    }
  }, { threshold: 0.4 })

  sections.forEach(s => observer.observe(s))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
