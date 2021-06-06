import { ListEntitiesRepository, ListEntitiesRepositoryDTO } from '@/data/common/repositories'
import faker from 'faker'

export class ListEntitiesRepositorySpy<RecordType = object> implements ListEntitiesRepository<RecordType> {
  filter: ListEntitiesRepositoryDTO
  entities: RecordType[] = [
    faker.random.objectElement<RecordType>(),
    faker.random.objectElement<RecordType>(),
    faker.random.objectElement<RecordType>()
  ]

  async list (filter: ListEntitiesRepositoryDTO): Promise<RecordType[]> {
    this.filter = filter
    return this.entities
  }
}
