export default class NormalUserAuthenticationFailed extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'NormalUserAuthenticationFailed'
  }
}
