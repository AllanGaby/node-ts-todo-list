import { DeleteEntityByIdUseCase } from '@/domain/common'

export class DeleteEntityByIdUseCaseSpy<EntityType> implements DeleteEntityByIdUseCase<EntityType> {
  entityId: string

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
