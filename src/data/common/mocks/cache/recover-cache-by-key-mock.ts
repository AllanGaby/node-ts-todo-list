import { RecoverCacheByKey } from '@/data/common/protocols'
import faker from 'faker'

export class RecoverCacheByKeySpy implements RecoverCacheByKey {
  key: string
  record: any = faker.random.objectElement<object>()

  async recover <RecordType = object>(key: string): Promise<RecordType> {
    this.key = key
    return this.record
  }
}
