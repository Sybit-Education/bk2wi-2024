<template>
  <b-card-group :columns="true" class="my-3">
    <SportTypeCard
      v-for="type in sportTypeList"
      :key="type.id"
      :sportType="type"
    />
  </b-card-group>
</template>

<script lang="ts">
import { useSportTypeStore } from '@/stores/sportType'
import { useLoadingStore } from '../../stores/loading'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import type SportType from '@/models/SportType'
import SportTypeCard from './SportTypeCard.vue'

export default defineComponent({
  name: 'ProjectListView',
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
