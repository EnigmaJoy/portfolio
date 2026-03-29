<template>
    <CursorTrail :section="activeSection"/>
    <HomePage id="main"/>
    <WelcomeAll id="welcome" class="page-bg-7"/>
    <AboutMe id="about" class="page-bg-3"/>
    <PersonalProjects id="projects" class="page-bg-5"/>
    <ContactMe id="contact" class="page-bg-6"/>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomePage from "@/views/HomePage.vue"
import AboutMe from "@/views/AboutMe.vue"
import ContactMe from "@/views/ContactMe.vue"
import PersonalProjects from "@/views/personalProjects.vue"
import WelcomeAll from "@/views/welcomeAll.vue"
import CursorTrail from "@/components/ui/CursorTrail.vue"

const activeSection = ref('main')
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
</style>
