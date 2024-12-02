import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { UserAccount } from '@/models/UserAccount'
import { AccountService } from '@/services/account.service'

export const useAccountStore = defineStore('account', () => {
  const accounts: Ref<UserAccount[]> = ref([])
  const accountService = new AccountService()

  // Create a new account
  async function createAccount(account: UserAccount): Promise<boolean> {
    const success = await accountService.createAccount(account)
    if (success) {
      accounts.value.push(account)
    }
    return success
  }

  // Get all accounts
  function getAccounts(): UserAccount[] {
    return accounts.value
  }

  // Find account by some identifier (e.g., email or ID)
  function findAccount(identifier: string): UserAccount | undefined {
    return accounts.value.find(
      account => account.email === identifier
    )
  }

  return {
    accounts,
    createAccount,
    getAccounts,
    findAccount
  }
})
