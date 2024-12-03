import { defineStore } from 'pinia'
import type Account from '@/models/Account'
import accountService from '@/services/account.service'
import { useLoadingStore } from './loading'

interface State {
  accountList: Array<Account>
  currentAccount: Account | null
}

export const useAccountStore = defineStore('account', {
  state: (): State => {
    return {
      accountList: [],
      currentAccount: null
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
        const createdAccount = await accountService.createAccount(account)
        if (createdAccount) {
          this.accountList.push(createdAccount)
          this.currentAccount = createdAccount
          return true
        }
        return false
      } catch (error) {
        console.error('Failed to create account', error)
        return false
      } finally {
        loadingStore.updateLoading(false)
      }
    },
    async isEmailRegistered(email: string) {
      try {
        return await accountService.isEmailRegistered(email)
      } catch (error) {
        console.error('Failed to check email registration', error)
        return false
      }
    },
    async getCurrentAccount(): Promise<Account | null> {
      // In a real app, this would check authentication state
      // For now, we'll return the first account or null
      return this.currentAccount
    },
    async updateAccount(account: Account): Promise<boolean> {
      try {
        const updatedAccount = await accountService.updateAccount(account)
        if (updatedAccount) {
          // Update the current account and the list
          this.currentAccount = updatedAccount
          const index = this.accountList.findIndex(a => a.id === account.id)
          if (index !== -1) {
            this.accountList[index] = updatedAccount
          }
          return true
        }
        return false
      } catch (error) {
        console.error('Failed to update account', error)
        return false
      }
    },
    async uploadProfileImage(file: File): Promise<string> {
      try {
        // This would typically call a service method to upload the image
        // and return the URL
        const imageUrl = await accountService.uploadProfileImage(file)
        return imageUrl
      } catch (error) {
        console.error('Failed to upload profile image', error)
        throw error
      }
    }
  }
})
