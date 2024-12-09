export default interface Account {
  id?: string | undefined
  email: string
  password: string
  name: string
  about?: string
  gender?: 'Männlich' | 'Weiblich' | 'Divers' | 'Keine Angabe'
  birthday?: Date | undefined
  profileImages?: string[]
}
