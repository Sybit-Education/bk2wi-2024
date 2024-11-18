<template>
  <b-card  :img-src="image" img-top>
    <b-card-title>{{ sportType.name }}</b-card-title>
    <b-card-text>
      <MarkdownRenderer :markdown="sportType.notes" />
    </b-card-text>
  </b-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from "pinia";
import type SportType from '@/models/SportType';
import { useSportTypeStore } from '@/stores/sportType';
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue';


export default defineComponent({
  props: {
    sportType: {
      type: Object as () => SportType,
      required: true
    }
  },
    computed: {
        ...mapState(useSportTypeStore, {
            imageById: (state) => state.imageById
        }),    
        image() : string {
            return this.imageById(this.sportType.id) as string;
        },
        detailUrl () {
            return '/sport/' + this.sportType.id
        }
    }
});
</script>
