import { ListEntitiesUseCase, ListEntitiesDTO, ListEntityModel, mockListEntityModel } from '@/domain/common'

export class ListEntitiesUseCaseSpy<RecortType = object> implements ListEntitiesUseCase<RecortType> {
  filter: ListEntitiesDTO
  entities: ListEntityModel<RecortType> = mockListEntityModel<RecortType>()

  async list (filter: ListEntitiesDTO): Promise<ListEntityModel<RecortType>> {
    this.filter = filter
    return this.entities
  }
}
