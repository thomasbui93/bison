export default class ChangePasswordFailure extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'ChangePasswordFailure'
  }
}
