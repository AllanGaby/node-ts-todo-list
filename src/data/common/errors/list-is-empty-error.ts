export class ListIsEmptyError extends Error {
  constructor (name: string) {
    super(`List of ${name} is empty`)
    this.name = 'ListIsEmptyError'
  }
}
