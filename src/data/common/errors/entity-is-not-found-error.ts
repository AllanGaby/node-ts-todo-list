export class EntityIsNotFoundError extends Error {
  constructor (entityName: string) {
    super(`${entityName} is not found`)
    this.name = 'EntityIsNotFoundError'
  }
}
