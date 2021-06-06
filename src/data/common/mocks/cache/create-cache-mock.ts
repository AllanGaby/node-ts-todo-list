import { CreateCacheDTO } from '@/data/common/protocols'
import faker from 'faker'

export const mockCreateCacheDTO = (prefix?: string): CreateCacheDTO => {
  if (prefix) {
    return {
      key: `${prefix}&${faker.random.uuid()}`,
      record: faker.random.objectElement<object>()
    }
  }
  return {
    key: faker.random.uuid(),
    record: faker.random.objectElement<object>()
  }
}
