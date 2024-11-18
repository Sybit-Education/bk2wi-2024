<script setup lang="ts">
import SportTypeList from '@/components/sport-type/SportTypeList.vue';
import { BAlert } from 'bootstrap-vue-next';
</script>

<template>
  <main>
    <b-alert variant="primary" show class="text-center my-3">
      <h2>Sportsy: Deine Leidenschaft, Dein Weg!</h2>
      <p>Jede Bewegung zählt. Finde deine perfekte Sportart und entdecke dein Potenzial.</p>
    </b-alert>
    <SportTypeList />
  </main>
</template>
