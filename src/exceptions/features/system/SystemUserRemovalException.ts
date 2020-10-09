export default class SystemUserRemovalException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = "SystemUserRemovalException"
  }
}
