import type Account from '@/models/Account'
import airtableBase from './airtable.service'
import { sha256 } from 'js-sha256'
import type { RecordData } from 'airtable'

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
                email: record.get('E-Mail') as string,
                password: record.get('Password') as string,
                about: record.get('About') as string,
                gender: record.get('Gender') as Account['gender'],
                birthday: record.get('Birthday') ? new Date(record.get('Birthday') as string) : undefined,
                profileImageUrl: record.get('Profile Image') as string,
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
      // Use SHA-256 for client-side hashing
      const hashedPassword = sha256(account.password)

      airtableBase(TABLE_NAME).create(
        [
          {
            fields: {
              'Name': account.name,
              'E-Mail': account.email,
              'Password': hashedPassword,  // Store hashed password
              'About': account.about || '',
              'Gender': account.gender || undefined,
              'Birthday': account.birthday && account.birthday instanceof Date ? account.birthday.toISOString().split('T')[0] : null,
              'Bilder': undefined, // No profile images yet
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
              password: '', // Do not return the hashed password
              about: createdRecord.get('About') as string,
              gender: createdRecord.get('Gender') as Account['gender'],
              birthday: createdRecord.get('Birthday') ? new Date(createdRecord.get('Birthday') as string) : undefined,
              profileImages: createdRecord.get('Bilder') as string[],
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
   * Update an existing account in Airtable
   * @param account Account details to update
   * @returns Promise resolving to updated account
   */
  async updateAccount(account: Account): Promise<Account | null> {
    return new Promise((resolve, reject) => {
      if (!account.id) {
        reject(new Error('Account ID is required for update'))
        return
      }

      airtableBase(TABLE_NAME).update(
        [
          {
            id: account.id,
            fields: {
              'Name': account.name,
              'About': account.about || '',
              'Gender': account.gender || '',
              'Birthday': account.birthday ? account.birthday.toISOString().split('T')[0] : '',
              'Bilder': account.profileImages || '',
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
            const updatedRecord = records[0]
            const updatedAccount: Account = {
              id: updatedRecord.id,
              name: updatedRecord.get('Name') as string,
              email: account.email, // Preserve original email
              password: account.password, // Preserve original password
              about: updatedRecord.get('About') as string,
              gender: updatedRecord.get('Gender') as Account['gender'],
              birthday: updatedRecord.get('Birthday') ? new Date(updatedRecord.get('Birthday') as string) : undefined,
              profileImageUrl: updatedRecord.get('Profile Image') as string,
            }
            resolve(updatedAccount)
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  /**
   * Upload profile image
   * @param file Image file to upload
   * @returns Promise resolving to image URL
   */
  async uploadProfileImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // In a real app, this would use a cloud storage service like Firebase or AWS S3
      // For this example, we'll simulate an upload
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        resolve(imageUrl)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(file)
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

  /**
   * Verify user credentials
   * @param email User's email
   * @param password User's password
   * @returns Promise resolving to boolean indicating successful login
   */
  async verifyCredentials(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      airtableBase(TABLE_NAME)
        .select({
          view: ACTIVE_VIEW,
          filterByFormula: `{E-Mail} = "${email}"`
        })
        .eachPage(
          (records, fetchNextPage) => {
            if (records.length === 0) {
              resolve(false)
              return
            }

            const storedPassword = records[0].get('Password') as string
            const hashedInputPassword = sha256(password)

            // Compare hashed passwords
            resolve(hashedInputPassword === storedPassword)

            fetchNextPage()
          },
          (err) => {
            if (err) {
              console.error(err)
              reject(err)
            }
          }
        )
    })
  }
}

export default new AccountService()
