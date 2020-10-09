export default class SystemUserCreateException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = "SystemUserCreateException"
  }
}
