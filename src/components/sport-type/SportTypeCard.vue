<template>
  <b-card 
    :img-src="image" 
    img-top 
    @click="navigateToDetail" 
    class="sport-type-card"
  >
    <b-card-title>{{ sportType.name }}</b-card-title>
    <b-card-text>
      <MarkdownRenderer :markdown="sportType.notes" />
    </b-card-text>
  </b-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from "pinia";
import { useRouter } from 'vue-router';
import type SportType from '@/models/SportType';
import { useSportTypeStore } from '@/stores/sportType';
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue';

export default defineComponent({
  components: {
    MarkdownRenderer
  },
  props: {
    sportType: {
      type: Object as () => SportType,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const navigateToDetail = () => {
      router.push({ name: 'sport-detail', params: { id: props.sportType.id } })
    }

    return { navigateToDetail }
  },
  computed: {
    ...mapState(useSportTypeStore, {
      imageById: (state) => state.imageById
    }),    
    image() : string {
      return this.imageById(this.sportType.id) as string;
    }
  }
});
</script>

<style scoped>
.sport-type-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.sport-type-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>
