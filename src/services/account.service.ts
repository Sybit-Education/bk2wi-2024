import type UserAccount from '@/models/Account'
import type { Ref } from 'vue'
import { ref } from 'vue'


export class AccountService {
  private accounts: Ref<UserAccount[]> = ref([])

  /**
   * Create a new user account
   * @param account User account details
   * @returns Promise resolving to boolean indicating success
   */
  async createAccount(account: UserAccount): Promise<boolean> {
    // Basic validation
    if (!this.validateAccount(account)) {
      console.error('Invalid account details')
      return false
    }

    try {
      // In a real-world scenario, this would interact with a backend API
      // For now, we'll simulate account creation
      this.accounts.value.push(account)
      console.log('Account created successfully', account.email)
      return true
    } catch (error) {
      console.error('Account creation failed', error)
      return false
    }
  }

  /**
   * Validate account details
   * @param account User account details
   * @returns Boolean indicating if account details are valid
   */
  private validateAccount(account: UserAccount): boolean {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return !!(
      account.email &&
      emailRegex.test(account.email) &&
      account.password &&
      account.password.length >= 8 &&
      account.name &&
      account.name.trim().length > 0
    )
  }

  /**
   * Check if an email is already registered
   * @param email Email to check
   * @returns Boolean indicating if email is already in use
   */
  isEmailRegistered(email: string): boolean {
    return this.accounts.value.some(account => account.email === email)
  }
}

// Singleton instance
  /**
   * Fetch all accounts
   * @returns Promise resolving to array of user accounts
   */
  async fetchAccounts(): Promise<UserAccount[]> {
    // In a real-world scenario, this would fetch from an API
    // For now, we'll return the existing accounts
    return this.accounts.value
  }

export const accountService = new AccountService()
