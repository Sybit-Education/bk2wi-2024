<script lang="ts">
import { defineComponent } from 'vue'
import { useSportTypeStore } from './stores/sportType'

export default defineComponent({
  async created() {
    await useSportTypeStore().load()
  },
})
</script>

<template>
  <header>
    <NavigationBar />
  </header>
  <main class="container">
    <RouterView />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<style scoped></style>
