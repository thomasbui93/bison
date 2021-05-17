export default class InvalidAuditException extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'InvalidAuditException'
  }
}
