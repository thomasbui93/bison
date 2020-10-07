export default class InvalidConfiguration extends Error {
  constructor(message: string) { 
    super(message)
    this.name = "InvalidConfiguration"
  }
}
