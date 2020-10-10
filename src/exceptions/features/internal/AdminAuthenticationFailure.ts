export default class AdminAuthenticationFailure extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'AdminAuthenticationFailure'
  }
}
