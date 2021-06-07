import { ListEntitiesUseCase } from '@/domain/common'

export class ListEntitiesUseCaseSpy<RecortType = object> implements ListEntitiesUseCase<RecortType> {
  filter: Partial<RecortType>
  entities: RecortType[]

  async list (filter: Partial<RecortType>): Promise<RecortType[]> {
    this.filter = filter
    return this.entities
  }
}
