<template>
  <div class="container">
    <div class="v-row justify-end align-center" style="margin-top: 20px; margin-right: 20px;">
      <MainButton color="#9b80d4"/>
    </div>
    <div class="v-row justify-start align-center" style="margin-top: 20px;">
      <div class="v-col header h1">
        {{ $t('navbar.welcome') }}
      </div>
    </div>

    <div class="tagline">
      {{ $t('welcome.tagline') }}
    </div>

    <div class="skills-section">
      <div class="skills-title">{{ $t('welcome.skills_title') }}</div>
      <div class="skills-grid">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="skill-card"
          :style="{ '--skill-color': skill.color }"
        >
          <v-icon :icon="skill.icon" :color="skill.color" size="32" />
          <span class="skill-name">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h1 {
  flex-direction: column;
  justify-content: end;
  align-items: start;
  color: #9b80d4;
}

.tagline {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #c4b5d8;
  font-style: italic;
  text-align: center;
  padding: 0 1.5rem;
  margin: 1.5rem 0 2.5rem;
  opacity: 0.85;
  line-height: 1.7;
}

.skills-section {
  padding: 0 1rem 3rem;
}

.skills-title {
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #9b80d4;
  margin-bottom: 1.5rem;
  text-align: center;
  opacity: 0.7;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.2rem 1rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, rgba(62, 46, 111, 0.45), rgba(20, 35, 71, 0.2));
  border: 1px solid rgba(var(--skill-color, 100, 75, 170), 0.2);
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(155, 128, 212, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(155, 128, 212, 0.25), inset 0 0 20px rgba(155, 128, 212, 0.08);
}

.skill-name {
  font-size: 0.8rem;
  color: #c4b5d8;
  letter-spacing: 0.04em;
}

/* ── Tablet 481–768px — 4 colonne ── */
@media (min-width: 481px) and (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.9rem;
  }

  .skill-card {
    padding: 1.4rem 1rem;
  }

  .skill-card :deep(.v-icon) {
    font-size: 2.2rem !important;
    width: 2.2rem !important;
    height: 2.2rem !important;
  }

  .skill-name {
    font-size: 0.85rem;
  }
}

/* ── Mobile ≤ 480px — 2 colonne ── */
@media (max-width: 480px) {
  .tagline {
    font-size: 0.9rem;
    padding: 0 1rem;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.7rem;
  }

  .skill-card {
    padding: 1.5rem 1rem;
  }

  .skill-card :deep(.v-icon) {
    font-size: 2.5rem !important;
    width: 2.5rem !important;
    height: 2.5rem !important;
  }

  .skill-name {
    font-size: 0.85rem;
  }
}
</style>

<script setup>
import MainButton from "@/components/ui/mainButton.vue";

const skills = [
  { name: 'Vue.js',      icon: 'mdi-vuejs',                color: '#42b883' },
  { name: 'Angular',     icon: 'mdi-angular',              color: '#dd1b16' },
  { name: 'TypeScript',  icon: 'mdi-language-typescript',  color: '#3178c6' },
  { name: 'JavaScript',  icon: 'mdi-language-javascript',  color: '#f7df1e' },
  { name: 'HTML5',       icon: 'mdi-language-html5',       color: '#e34c26' },
  { name: 'CSS3',        icon: 'mdi-language-css3',        color: '#1572b6' },
  { name: 'Tailwind',    icon: 'mdi-tailwind',             color: '#06b6d4' },
  { name: 'Nuxt',        icon: 'mdi-nuxt',                 color: '#00dc82' },
 // { name: 'Docker',      icon: 'mdi-docker',               color: '#2496ed' },
  { name: 'Git',         icon: 'mdi-git',                  color: '#f05032' },
]
</script>