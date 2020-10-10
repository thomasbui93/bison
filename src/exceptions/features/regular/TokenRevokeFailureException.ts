export default class TokenRevokeFailureException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'TokenRevokeFailureException'
  }
}
