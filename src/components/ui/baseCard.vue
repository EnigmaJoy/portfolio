<template>
  <v-card class="card">
    <v-card-text>
      <div v-if="$slots.title" class="card_title">
        <slot name="title" />
      </div>
      <div class="card_content">
        <slot />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100px;
  border-radius: 16px;
  border: 1px solid rgba(196, 122, 48, 0.12);
  background: linear-gradient(to bottom right, rgba(42, 24, 53, 0.5), rgba(26, 14, 46, 0.4));
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
}

.card_title {
  font-size: 1.8rem;
  margin-bottom: 16px;
  letter-spacing: 0.03em;
}

.card_content {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.95;
}
</style>
<script setup>

</script>
