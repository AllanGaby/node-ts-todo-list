import { ListEntitiesRepository } from '@/data/common/repositories'
import faker from 'faker'

export class ListEntitiesRepositorySpy<RecordType = object> implements ListEntitiesRepository<RecordType> {
  filter: Partial<RecordType>
  entities: RecordType[] = [
    faker.random.objectElement<RecordType>(),
    faker.random.objectElement<RecordType>(),
    faker.random.objectElement<RecordType>()
  ]

  async list (filter: Partial<RecordType>): Promise<RecordType[]> {
    this.filter = filter
    return this.entities
  }
}
