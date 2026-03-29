<script setup>
import MainButton from "@/components/ui/mainButton.vue";

const projects = [
  {
    key: 'easy_go',
    title: 'Easy-Go Travel Wizard',
    github: 'https://github.com/EnigmaJoy/Easy-Go-Travel-Preferences-Wizard',
    tech: ['Vue 3', 'Vite', 'Tailwind CSS'],
  },
  {
    key: 'linoir',
    title: 'Linoir',
    github: 'https://github.com/EnigmaJoy/linoir',
    tech: ['Angular', 'TypeScript', 'Docker', 'PWA'],
  },
  {
    key: 'countdown_pet',
    title: 'Countdown Pet',
    github: 'https://github.com/EnigmaJoy/countdown-pet',
    tech: ['Vue', 'Nuxt', 'TypeScript', 'Anime.js'],
  },
  {
    key: 'qr_anniversary',
    title: 'QR Anniversary',
    github: 'https://github.com/EnigmaJoy/qr_anniversary',
    tech: ['HTML', 'CSS'],
  },
]
</script>

<template>
  <div class="container">
    <div class="v-row justify-end align-center" style="margin-top: 20px; margin-right: 20px;">
      <MainButton color="#c45a78"/>
    </div>
    <div class="container header h1">
      {{ $t('navbar.projects') }}
    </div>

    <div class="projects-grid">
      <div
        v-for="project in projects"
        :key="project.key"
        class="project-card"
      >
        <div class="project-header">
          <v-icon icon="mdi-code-braces" color="#e08a9e" size="22" style="margin-right: 8px;" />
          <span class="project-title">{{ project.title }}</span>
        </div>

        <p class="project-description">
          {{ $t(`projects.items.${project.key}.description`) }}
        </p>

        <div class="project-tech">
          <span v-for="tag in project.tech" :key="tag" class="tech-chip">{{ tag }}</span>
        </div>

        <div class="project-footer">
          <a :href="project.github" target="_blank" rel="noopener noreferrer" class="github-link">
            <v-icon icon="mdi-github" size="18" style="margin-right: 6px;" />
            {{ $t('projects.view_code') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h1 {
  flex-direction: column;
  align-items: start;
  color: #c45a78;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0 3rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, rgba(42, 15, 23, 0.5), rgba(111, 30, 58, 0.15));
  border: 1px solid rgba(160, 45, 75, 0.2);
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(196, 90, 120, 0.2);
}

.project-header {
  display: flex;
  align-items: center;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e08a9e;
  letter-spacing: 0.02em;
}

.project-description {
  font-size: 0.9rem;
  color: #d4a8b4;
  line-height: 1.65;
  flex: 1;
  margin: 0;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-chip {
  font-size: 0.72rem;
  padding: 2px 10px;
  border-radius: 20px;
  background: rgba(160, 45, 75, 0.15);
  border: 1px solid rgba(160, 45, 75, 0.3);
  color: #e08a9e;
  letter-spacing: 0.04em;
}

.project-footer {
  border-top: 1px solid rgba(160, 45, 75, 0.15);
  padding-top: 0.8rem;
}

.github-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.85rem;
  color: #d4a8b4;
  text-decoration: none;
  transition: color 0.2s ease;
}

.github-link:hover {
  color: #e08a9e;
}

/* ── Mobile ≤ 480px ── */
@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem 0 2rem;
  }

  .project-card {
    padding: 1.2rem;
  }
}

/* ── Tablet 481–768px ── */
@media (min-width: 481px) and (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>