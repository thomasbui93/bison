export default class SystemUserAuthenticationFailed extends Error {
  constructor(message: string) { 
    super(message)
    this.name = "SystemUserAuthenticationFailed"
  }
}
