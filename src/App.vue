<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/navigation/NavigationBar.vue'
import FooterBar from './components/navigation/FooterBar.vue'
</script>

<template>
  <header>
    <NavigationBar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<style scoped></style>
