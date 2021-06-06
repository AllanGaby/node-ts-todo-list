import { CreateCache, CreateCacheDTO } from '@/data/common/protocols'
import faker from 'faker'

export class CreateCacheSpy implements CreateCache {
  params: CreateCacheDTO<any>
  record: any = faker.random.objectElement<object>()

  async create<RecordType = object>(params: CreateCacheDTO<RecordType>): Promise<RecordType> {
    this.params = params
    return this.record
  }
}
