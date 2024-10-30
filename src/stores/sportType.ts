import { defineStore } from 'pinia'
import type SportType from '@/models/SportType'
import sportTypeService from '@/services/sport-type.service'
import { useLoadingStore } from './loading'

interface State {
  sportTypeList: Array<SportType>
}
export const useSportTypeStore = defineStore('sportType', {
  state: (): State => {
    return {
      sportTypeList: [],
    }
  },
  getters: {
    getAll: state => state.sportTypeList,
    getById: state => (id: string) =>
      state.sportTypeList.find((type: SportType) => type.id === id),
    imageById: state => (id: string) => {
      const item = state.sportTypeList.find((type: SportType) => type.id === id)
      if (item && item.image) {
        return item.image[0].thumbnails.large.url
      } else {
        return ''
      }
    },
  },
  actions: {
    async load() {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)
      sportTypeService.getList().then(result => {
        this.sportTypeList = result as Array<SportType>
        loadingStore.updateLoading(false)
      })
    },
  },
})
