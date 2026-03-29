<template>
  <div class="nav-row">

    <!-- Language dropdown -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-chip v-bind="props" class="top-navbar" style="cursor: pointer;">
          {{ selectedLang.label }}
        </v-chip>
      </template>
      <div class="menu-box">
        <v-chip-group v-model="selectedValue" column mandatory>
          <v-chip
            v-for="l in lang"
            :key="l.value"
            :value="l.value"
            class="option-chip"
            @click="selectLang(l)"
          >
            {{ l.label }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-menu>

    <!-- Desktop nav: chip-group -->
    <div v-if="!isMobile" class="nav-container">
      <v-chip-group class="top-navbar">
        <v-chip style="margin-left: 8px" @click="scrollTo('welcome')">{{ $t('navbar.welcome') }}</v-chip>
        <v-chip style="margin-left: 8px" @click="scrollTo('about')">{{ $t('navbar.about_me') }}</v-chip>
        <v-chip style="margin-left: 8px" @click="scrollTo('projects')">{{ $t('navbar.projects') }}</v-chip>
        <v-chip style="margin-left: 8px" @click="scrollTo('contact')">{{ $t('navbar.contact') }}</v-chip>
      </v-chip-group>
    </div>

    <!-- Mobile nav: dropdown identico alle lingue -->
    <v-menu v-else offset-y>
      <template #activator="{ props }">
        <v-chip v-bind="props" class="top-navbar" style="cursor: pointer;">
          <v-icon icon="mdi-menu" size="18" />
        </v-chip>
      </template>
      <div class="menu-box">
        <v-chip-group column>
          <v-chip
            v-for="item in navItems"
            :key="item.id"
            class="option-chip"
            @click="scrollTo(item.id)"
          >
            {{ $t(item.key) }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-menu>

  </div>
</template>

<style scoped>
.nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.top-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
}

.top-navbar,
.top-navbar :deep(.v-field) {
  background: linear-gradient(to bottom right, rgba(196, 122, 48, 0.08), rgba(42, 24, 53, 0.6));
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
  border-radius: 22px;
  border: 1px solid rgba(196, 122, 48, 0.15);
  box-shadow:
    0 6px 25px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(196, 122, 48, 0.04),
    inset 0 0 40px rgba(255, 255, 255, 0.02);
}

.menu-box {
  background: linear-gradient(to bottom right, rgba(42, 24, 53, 0.95), rgba(17, 10, 30, 0.98));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(196, 122, 48, 0.15);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

.option-chip {
  background: linear-gradient(to bottom right, rgba(196, 122, 48, 0.08), rgba(42, 24, 53, 0.6)) !important;
  border: 1px solid rgba(196, 122, 48, 0.15) !important;
  color: var(--color-text-muted) !important;
}
</style>

<script setup lang="js">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"

const lang = [
  { label: "it", value: "Italiano" },
  { label: "en", value: "English" },
  { label: "es", value: "Español" },
  { label: "chs", value: "Chinese" },
]

const navItems = [
  { key: 'navbar.welcome',  id: 'welcome'  },
  { key: 'navbar.about_me', id: 'about'    },
  { key: 'navbar.projects', id: 'projects' },
  { key: 'navbar.contact',  id: 'contact'  },
]

const selectedLang = ref(lang[0])
const selectedValue = ref(selectedLang.value.value)
const isMobile = ref(false)
const { locale } = useI18n()

function checkMobile() {
  isMobile.value = window.innerWidth <= 480
}

function selectLang(l) {
  selectedLang.value = l
  selectedValue.value = l.value
  locale.value = l.label
  localStorage.setItem("locale", l.label)
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  const saved = localStorage.getItem("locale")
  if (saved) {
    const found = lang.find(l => l.label === saved)
    if (found) {
      selectedLang.value = found
      locale.value = found.label
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>