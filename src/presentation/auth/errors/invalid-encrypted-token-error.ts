export class InvalidEncryptedTokenError extends Error {
  constructor () {
    super('Token provide is invalid')
    this.name = 'InvalidEncryptedTokenError'
  }
}
