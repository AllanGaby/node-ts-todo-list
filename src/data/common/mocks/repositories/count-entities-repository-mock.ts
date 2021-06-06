import { CountEntitiesRepository } from '@/data/common/repositories'
import faker from 'faker'

export class CountEntitiesRepositorySpy<RecordType = object> implements CountEntitiesRepository<RecordType> {
  textToSearch: string
  recordCount: number = faker.random.number({ min: 0 })

  async count (textToSearch?: string): Promise<number | RecordType> {
    this.textToSearch = textToSearch
    return this.recordCount
  }
}
