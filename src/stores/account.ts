import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Account } from '@/models/Account'
import { AccountService } from '@/services/account.service'

export const useAccountStore = defineStore('account', () => {
  const accounts: Ref<Account[]> = ref([])
  const accountService = new AccountService()

  // Create a new account
  async function createAccount(account: Account): Promise<boolean> {
    const success = await accountService.createAccount(account)
    if (success) {
      accounts.value.push(account)
    }
    return success
  }

  // Get all accounts
  function getAccounts(): Account[] {
    return accounts.value
  }

  // Find account by some identifier (e.g., email or ID)
  function findAccount(identifier: string): Account | undefined {
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
