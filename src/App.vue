<script lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/navigation/NavigationBar.vue'
import FooterBar from './components/navigation/FooterBar.vue'
import { defineComponent } from 'vue'
import { useSportTypeStore } from './stores/sportType'

export default defineComponent({
  components: {
    NavigationBar,
    FooterBar,
    RouterView,
  },

  created() {
    useSportTypeStore().load()
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
