export class TypeOrmRepositorySpy<Entity = object> {
  create (entity: Entity): Entity {
    return entity
  }

  save (entity: Entity): Entity {
    return entity
  }

  findOne (options?: any): Entity {
    return undefined
  }

  find (options?: any): Entity[] {
    return undefined
  }

  delete (options?: any): void {
    return undefined
  }
}
