<template>
  <div>
    <b-card-group v-if="!showLoadingSpinner" :columns="true" class="my-3">
      <SportTypeCard
        v-for="type in sportTypeList"
        :key="type.id"
        :sportType="type"
      />
    </b-card-group>
    <div v-else class="text-center my-5">
      <b-spinner variant="primary" label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { useSportTypeStore } from '@/stores/sportType'
import { useLoadingStore } from '../../stores/loading'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import type SportType from '@/models/SportType'
import { BSpinner } from 'bootstrap-vue-next'
import SportTypeCard from './SportTypeCard.vue'

export default defineComponent({
  name: 'ProjectListView',
  components: {
    BSpinner,
    SportTypeCard,
  },
  computed: {
    ...mapState(useSportTypeStore, {
      sportTypeList: store => store.sportTypeList as Array<SportType>,
    }),
    ...mapState(useLoadingStore, {
      showLoadingSpinner: store => store.showLoadingSpinner,
    }),
  },
})
</script>
