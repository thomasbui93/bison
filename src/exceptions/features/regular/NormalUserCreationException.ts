export default class NormalUserCreateException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'NormalUserCreateException'
  }
}
