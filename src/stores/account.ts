import { defineStore } from 'pinia'
import type Account from '@/models/Account'
import accountService from '@/services/account.service'
import { useLoadingStore } from './loading'

interface State {
  accountList: Array<Account>
}

export const useAccountStore = defineStore('account', {
  state: (): State => {
    return {
      accountList: [],
    }
  },
  getters: {
    getAll: state => state.accountList,
    getByEmail: state => (email: string) =>
      state.accountList.find((account: Account) => account.email === email),
  },
  actions: {
    async load() {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)

      try {
        // Assuming accountService has a method to fetch accounts
        const accounts = await accountService.getList()
        this.accountList = accounts
      } catch (error) {
        console.error('Failed to load accounts', error)
      } finally {
        loadingStore.updateLoading(false)
      }
    },
    async createAccount(account: Account) {
      const loadingStore = useLoadingStore()
      loadingStore.updateLoading(true)

      try {
        const success = await accountService.createAccount(account)
        if (success) {
          this.accountList.push(account)
        }
        return success
      } catch (error) {
        console.error('Failed to create account', error)
        return false
      } finally {
        loadingStore.updateLoading(false)
      }
    }
  }
})
