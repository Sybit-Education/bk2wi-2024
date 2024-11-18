<template>
  <div v-if="!showLoadingSpinner && sportType" class="sport-type-detail container mt-4">
    <b-breadcrumb :items="breadcrumbItems" class="mb-3"></b-breadcrumb>
    <div class="row">
      <div v-if="image" class="col-md-6">
        <img :src="image" :alt="sportType.name" class="img-fluid rounded mb-3">
      </div>
      <div :class="image ? 'col-md-6' : 'col-12'">
        <h1>{{ sportType.name }}</h1>
        <MarkdownRenderer :markdown="sportType.notes" />
      </div>
    </div>
  </div>
  <div v-else class="text-center my-5">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSportTypeStore } from '@/stores/sportType'
import { useLoadingStore } from '@/stores/loading'
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue'
import type SportType from '@/models/SportType'

export default defineComponent({
  name: 'SportTypeDetailView',
  components: {
    MarkdownRenderer
  },
  setup() {
    const route = useRoute()
    const sportTypeStore = useSportTypeStore()
    const loadingStore = useLoadingStore()
    const sportType = ref<SportType | null>(null)
    const image = ref('')
    const isLoading = ref(true)

    const breadcrumbItems = [
      {
        text: 'Home',
        to: { name: 'home' }
      },
      {
        text: 'Sport Types',
        to: { name: 'home' }
      },
      {
        text: '',
        active: true
      }
    ]

    onMounted(async () => {
      // Ensure loading is tracked
      loadingStore.updateLoading(true)
      
      try {
        // If sport types are not loaded, wait for them to load
        if (sportTypeStore.sportTypeList.length === 0) {
          await sportTypeStore.fetchSportTypes()
        }

        const sportTypeId = route.params.id as string
        sportType.value = sportTypeStore.sportTypeList.find(st => st.id === sportTypeId) || null

        if (sportType.value) {
          const fetchedImage = sportTypeStore.imageById(sportType.value.id)
          image.value = fetchedImage || '' // Use empty string if no image

          // Update the last breadcrumb item with the sport type name
          breadcrumbItems[2].text = sportType.value.name
        }
      } finally {
        // Always stop loading, whether successful or not
        loadingStore.updateLoading(false)
        isLoading.value = false
      }
    })

    return {
      sportType,
      image,
      breadcrumbItems,
      isLoading,
      showLoadingSpinner: computed(() => loadingStore.showLoadingSpinner)
    }
  }
})
</script>

<style scoped>
.sport-type-detail img {
  max-height: 400px;
  object-fit: cover;
}
</style>
