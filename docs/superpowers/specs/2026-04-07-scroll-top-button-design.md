# Design: Unified Fixed Scroll-Top Button

**Date:** 2026-04-07

## Problem

`MainButton` (the arrow-up button that scrolls back to `#main`) is duplicated in every view except `HomePage`. Each view hardcodes its own color. The button position is relative to the section's layout, not the viewport.

## Goal

- Single instance of `MainButton`, owned by `App.vue`
- Fixed position: `top: 20px; right: 20px` — always visible while scrolling within a section
- Color adapts automatically to the active section's palette
- Hidden on the homepage (`#main`)

## Architecture

### `MainButton` component — no changes

Accepts `color` prop, renders the arrow-up button, handles `scrollIntoView('#main')`. No modifications needed.

### `App.vue` — changes

1. Add `<MainButton>` as a direct child with inline style `position: fixed; top: 20px; right: 20px; z-index: 1000`
2. Add `sectionColors` map:
   ```js
   const sectionColors = {
     welcome:  '#9b80d4',
     about:    '#5a9ec4',
     projects: '#c45a78',
     contact:  '#c4a055',
   }
   ```
3. Computed `currentColor`: `sectionColors[activeSection.value] ?? '#d4944a'`
4. Use `v-show="activeSection !== 'main'"` to hide on homepage
5. Wrap in a `<Transition name="fade">` for smooth appear/disappear

### Views to clean up

Remove `<MainButton>` markup, its wrapping `<div>`, and its `import` from:
- `src/views/welcomeAll.vue`
- `src/views/AboutMe.vue`
- `src/views/personalProjects.vue`
- `src/views/ContactMe.vue`

## Files Changed

| File | Change |
|------|--------|
| `src/App.vue` | Add fixed `MainButton` with reactive color |
| `src/views/welcomeAll.vue` | Remove `MainButton` |
| `src/views/AboutMe.vue` | Remove `MainButton` |
| `src/views/personalProjects.vue` | Remove `MainButton` |
| `src/views/ContactMe.vue` | Remove `MainButton` |

## Out of Scope

- No changes to `MainButton` internals
- No router changes
- No new dependencies