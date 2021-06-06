import { EntityModel } from '@/domain/common'
import faker from 'faker'

export const mockEntityModel = (): EntityModel => ({
  id: faker.random.uuid(),
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
