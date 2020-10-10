export default class TokenAuthenticationException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'TokenAuthenticationException'
  }
}
