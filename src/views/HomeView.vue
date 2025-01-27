<template>

  <BNavbar v-b-color-mode="'bright'" variant="primary">
    <BNavForm>
      <BFormInput class="me-sm-2" placeholder="Suche" list="sportType"  />
          <datalist id="sportType">
        <option>Manual Option</option>
        <option v-for="sportType in sportTypeList" :key="sportType.id">{{ sportType.name }}</option>
      </datalist>
      <BButton variant="outline-success" class="my-2 my-sm-0" type="submit">Suche</BButton>
    </BNavForm>
  </BNavbar>
  <main>
    <MotivationalBanner />
    <SportTypeList />
  </main>
</template>
<script lang="ts">
import { useSportTypeStore } from '@/stores/sportType'
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import type SportType from '@/models/SportType'
import SportTypeList from '@/components/sport-type/SportTypeList.vue';
import MotivationalBanner from '@/components/common/MotivationalBanner.vue';
//const sportlist = ['Badminton', 'Reiten', 'Skateboarden', 'Klettern', 'Ringen', 'Tennis', 'Trail-Running']
export default defineComponent({
  computed: {
    ...mapState(useSportTypeStore, {
      sportTypeList: store => store.sportTypeList as Array<SportType>,
    }),
  }
})
</script>