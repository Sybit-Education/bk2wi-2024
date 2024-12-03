export default interface Account {
  id?: string | undefined
  email: string
  password: string
  name: string
  about?: string
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  birthday?: Date
  profileImageUrl?: string
}
