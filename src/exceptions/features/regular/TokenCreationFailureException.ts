export default class TokenCreationFailureException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'TokenCreationFailureException'
  }
}
