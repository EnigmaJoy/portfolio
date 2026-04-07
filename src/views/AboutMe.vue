<template>
 <div class="container">
   <div class="v-row justify-end v-col-5 header h1">
     {{ $t('navbar.about_me') }}
   </div>
   <div class="v-row">
     <div class="v-col-12 justify-center align-center">
       <BaseCard>
         <template #title>
           {{ $t('about.card_title') }}
         </template>
         {{ $t('about.description') }}
       </BaseCard>
     </div>
     <div class="v-col-12 justify-center align-center">
       <BaseCard class="carousel-card">
         <PhotoCarousel />
       </BaseCard>
     </div>
   </div>
 </div>
</template>

<style scoped>
.h1 {
  flex-direction: column;
  align-items: end;
  color: #5a9ec4;
  margin-right: 20px;
  margin-top: 2.5rem;
}

:deep(.card) {
  background: linear-gradient(to bottom right, rgba(17, 42, 70, 0.5), rgba(52, 92, 156, 0.15));
  border: 1px solid rgba(52, 92, 156, 0.2);
}

:deep(.card_title) {
  color: #7ab8e0;
}

:deep(.card_content) {
  color: #b0c8de;
}

.carousel-card :deep(.card) {
  max-height: none;
}

.carousel-card :deep(.card_content) {
  width: 100%;
}

/* ── Tablet 481–768px ── */
@media (min-width: 481px) and (max-width: 768px) {
  .carousel-card :deep(.card) {
    min-height: calc(100vh - 420px);
  }
}
</style>

<script setup>
import BaseCard from "@/components/ui/baseCard.vue";
import PhotoCarousel from "@/components/ui/PhotoCarousel.vue";
</script>