export class InvalidStatusAccountError extends Error {
  constructor () {
    super('Invalid status account')
    this.name = 'InvalidStatusAccountError'
  }
}
