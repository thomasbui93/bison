export default class SystemUserSearchFailed extends Error {
  constructor(message: string) { 
    super(message)
    this.name = 'SystemUserSearchFailed'
  }
}
