import type UserAccount from '@/models/Account'
import airtableBase from './airtable.service'

const TABLE_NAME = 'Account'

class AccountService {
  /**
   * Get list of accounts from Airtable
   * @returns Promise resolving to array of accounts
   */
  async getList(): Promise<UserAccount[]> {
    return new Promise((resolve, reject) => {
      const accounts: UserAccount[] = []

      airtableBase(TABLE_NAME)
        .select({
          view: 'Grid view'
        })
        .eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              accounts.push({
                id: record.id,
                name: record.get('name') as string,
                email: record.get('email') as string,
                password: record.get('password') as string,
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
  async createAccount(account: UserAccount): Promise<UserAccount | null> {
    return new Promise((resolve, reject) => {
      airtableBase(TABLE_NAME).create(
        [
          {
            fields: {
              name: account.name,
              email: account.email,
              password: account.password,
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
            const createdAccount: UserAccount = {
              id: createdRecord.id,
              name: createdRecord.get('name') as string,
              email: createdRecord.get('email') as string,
              password: createdRecord.get('password') as string,
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
}

export default new AccountService()
