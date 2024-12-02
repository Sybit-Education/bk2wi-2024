import type Account from '@/models/Account'
import airtableBase from './airtable.service'

const TABLE_NAME = 'Account'
const ACTIVE_VIEW = 'Grid view'

class AccountService {
  /**
   * Get list of accounts from Airtable
   * @returns Promise resolving to array of accounts
   */
  async getList(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      const accounts: Account[] = []

      airtableBase(TABLE_NAME)
        .select({
          view: ACTIVE_VIEW
        })
        .eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              accounts.push({
                id: record.id,
                name: record.get('Name') as string,
                email: record.get('E-Mmail') as string,
                password: record.get('Password') as string,
                // Add other fields as needed
              })
            })
            fetchNextPage()
          },
          (err) => {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve(accounts)
            }
          }
        )
    })
  }

  /**
   * Create a new account in Airtable
   * @param account Account details to create
   * @returns Promise resolving to created account
   */
  async createAccount(account: Account): Promise<Account | null> {
    return new Promise((resolve, reject) => {
      airtableBase(TABLE_NAME).create(
        [
          {
            fields: {
              'Name': account.name,
              'E-Mail': account.email,
              'Password': account.password,
              // Add other fields as needed
            }
          }
        ],
        (err, records) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }

          if (records && records.length > 0) {
            const createdRecord = records[0]
            const createdAccount: Account = {
              id: createdRecord.id,
              name: createdRecord.get('Name') as string,
              email: createdRecord.get('E-Mail') as string,
              password: createdRecord.get('Password') as string,
              // Add other fields as needed
            }
            resolve(createdAccount)
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  /**
   * Check if an email is already registered
   * @param email Email to check
   * @returns Promise resolving to boolean indicating email registration status
   */
  async isEmailRegistered(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const accounts: Account[] = []

      airtableBase(TABLE_NAME)
        .select({
          view: ACTIVE_VIEW,
          filterByFormula: `{E-Mail} = "${email}"`
        })
        .eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              accounts.push({
                id: record.id,
                email: record.get('E-Mail') as string,
                name: record.get('Name') as string,
                password: '', // Empty string since we're just checking email
              })
            })
            fetchNextPage()
          },
          (err) => {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              resolve(accounts.length > 0)
            }
          }
        )
    })
  }
}

export default new AccountService()
