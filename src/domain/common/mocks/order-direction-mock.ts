import { OrderDirection } from '@/domain/common'
import faker from 'faker'

export const mockOrderDirection = (): OrderDirection => {
  return faker.random.arrayElement([
    OrderDirection.ASC,
    OrderDirection.DESC
  ])
}
