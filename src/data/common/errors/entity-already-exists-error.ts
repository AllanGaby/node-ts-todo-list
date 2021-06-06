export class EntityAlreadyExistsError extends Error {
  constructor (entityName: string) {
    super(`${entityName} already exists`)
    this.name = 'EntityAlreadyExistsError'
  }
}
