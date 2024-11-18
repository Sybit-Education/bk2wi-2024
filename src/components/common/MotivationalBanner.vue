<template>
  <div class="motivational-banner text-center py-4 bg-primary text-white">
    <div class="container">
      <h2 class="display-6 mb-3">Sportsy: Deine Leidenschaft, Dein Weg!</h2>
      <p class="lead">Jede Bewegung zählt. Finde deine perfekte Sportart und entdecke dein Potenzial.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MotivationalBanner'
})
</script>

<style scoped>
.motivational-banner {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>
