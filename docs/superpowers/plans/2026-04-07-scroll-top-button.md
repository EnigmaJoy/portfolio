# Unified Fixed Scroll-Top Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the duplicated `MainButton` in each view with a single fixed-position instance in `App.vue` that changes color based on the active section.

**Architecture:** `App.vue` already tracks `activeSection` via IntersectionObserver. We add one `MainButton` there with `position: fixed`, a `sectionColors` map, and a `v-show` to hide it on the homepage. All views have their local `MainButton` removed.

**Tech Stack:** Vue 3 (Composition API), Vuetify 3

---

## File Map

| File | Action |
|------|--------|
| `src/App.vue` | Add fixed `MainButton` with reactive color + fade transition |
| `src/views/welcomeAll.vue` | Remove `MainButton` markup and import |
| `src/views/AboutMe.vue` | Remove `MainButton` markup and import |
| `src/views/personalProjects.vue` | Remove `MainButton` markup and import |
| `src/views/ContactMe.vue` | Remove `MainButton` markup and import |

---

### Task 1: Add fixed `MainButton` to `App.vue`

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Add the color map and computed color to the script**

In `src/App.vue`, replace the `<script setup>` block with:

```js
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
let observer = null

const sectionColors = {
  welcome:  '#9b80d4',
  about:    '#5a9ec4',
  projects: '#c45a78',
  contact:  '#c4a055',
}

const currentColor = computed(() => sectionColors[activeSection.value] ?? '#d4944a')

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
```

- [ ] **Step 2: Add the fixed `MainButton` and fade transition to the template**

Replace the `<template>` block in `src/App.vue` with:

```html
<template>
  <CursorTrail :section="activeSection"/>
  <HomePage id="main"/>
  <WelcomeAll id="welcome" class="page-bg-7"/>
  <AboutMe id="about" class="page-bg-3"/>
  <PersonalProjects id="projects" class="page-bg-5"/>
  <ContactMe id="contact" class="page-bg-6"/>

  <Transition name="fade">
    <MainButton
      v-show="activeSection !== 'main'"
      :color="currentColor"
      style="position: fixed; top: 20px; right: 20px; z-index: 1000;"
    />
  </Transition>
</template>
```

- [ ] **Step 3: Add the fade transition CSS to `App.vue`**

Replace the `<style>` block with:

```css
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
```

- [ ] **Step 4: Verify visually in the browser**

Run: `npm run dev`

Check:
- On the homepage (`#main`): button is **not visible**
- Scroll to any other section: button **appears** in top-right corner, fixed
- Button color matches the section palette (purple on welcome, blue on about, pink on projects, amber on contact)
- Smooth fade when transitioning between homepage and other sections

- [ ] **Step 5: Commit**

```bash
git add src/App.vue
git commit -m "feat(PTF-005): Add fixed reactive scroll-top button to App.vue"
```

---

### Task 2: Remove `MainButton` from `welcomeAll.vue`

**Files:**
- Modify: `src/views/welcomeAll.vue`

- [ ] **Step 1: Remove the button markup**

In `src/views/welcomeAll.vue`, remove this block from the template (it's the first element inside `<div class="container">`):

```html
<div class="v-row justify-end align-center" style="margin-top: 20px; margin-right: 20px;">
  <MainButton color="#9b80d4"/>
</div>
```

- [ ] **Step 2: Remove the import**

In the `<script setup>` block, remove:

```js
import MainButton from "@/components/ui/mainButton.vue";
```

- [ ] **Step 3: Commit**

```bash
git add src/views/welcomeAll.vue
git commit -m "refactor(PTF-005): Remove local MainButton from welcomeAll"
```

---

### Task 3: Remove `MainButton` from `AboutMe.vue`

**Files:**
- Modify: `src/views/AboutMe.vue`

- [ ] **Step 1: Remove the button markup**

In `src/views/AboutMe.vue`, remove this block from the template:

```html
<div class="v-row justify-end align-center" style="margin-top: 20px; margin-right: 20px;">
  <MainButton color="#5a9ec4"/>
</div>
```

- [ ] **Step 2: Remove the import**

In the `<script setup>` block, remove:

```js
import MainButton from "@/components/ui/mainButton.vue";
```

- [ ] **Step 3: Commit**

```bash
git add src/views/AboutMe.vue
git commit -m "refactor(PTF-005): Remove local MainButton from AboutMe"
```

---

### Task 4: Remove `MainButton` from `personalProjects.vue`

**Files:**
- Modify: `src/views/personalProjects.vue`

- [ ] **Step 1: Remove the button markup**

In `src/views/personalProjects.vue`, remove this block from the template:

```html
<div class="v-row justify-end align-center" style="margin-top: 20px; margin-right: 20px;">
  <MainButton color="#c45a78"/>
</div>
```

- [ ] **Step 2: Remove the import**

In the `<script setup>` block, remove:

```js
import MainButton from "@/components/ui/mainButton.vue";
```

- [ ] **Step 3: Commit**

```bash
git add src/views/personalProjects.vue
git commit -m "refactor(PTF-005): Remove local MainButton from personalProjects"
```

---

### Task 5: Remove `MainButton` from `ContactMe.vue`

**Files:**
- Modify: `src/views/ContactMe.vue`

- [ ] **Step 1: Remove the button markup**

In `src/views/ContactMe.vue`, remove this block from the template:

```html
<div class="v-row justify-end align-center" style="margin-top: 20px; margin-right: 20px;">
  <MainButton color="#c4a055"/>
</div>
```

- [ ] **Step 2: Remove the import**

In the `<script setup>` block, remove:

```js
import MainButton from "@/components/ui/mainButton.vue";
```

- [ ] **Step 3: Commit**

```bash
git add src/views/ContactMe.vue
git commit -m "refactor(PTF-005): Remove local MainButton from ContactMe"
```

---

### Task 6: Final verification

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check each section**

| Section | Expected button color | Button visible? |
|---------|----------------------|-----------------|
| `#main` (HomePage) | — | No |
| `#welcome` | `#9b80d4` (purple) | Yes, top-right fixed |
| `#about` | `#5a9ec4` (blue) | Yes, top-right fixed |
| `#projects` | `#c45a78` (pink) | Yes, top-right fixed |
| `#contact` | `#c4a055` (amber) | Yes, top-right fixed |

- [ ] **Step 3: Verify click behavior**

From any section, click the button → page scrolls back to `#main` smoothly.
