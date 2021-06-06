export class InvalidCredentialsError extends Error {
  constructor () {
    super('Email or password is incorrect')
    this.name = 'InvalidCredentialsError'
  }
}
