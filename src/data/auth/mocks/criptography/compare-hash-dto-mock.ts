import { CompareHashDTO } from '@/data/auth/protocols'
import faker from 'faker'

export const mockCompareHashDTO = (): CompareHashDTO => ({
  hash: faker.random.uuid(),
  payload: faker.random.uuid()
})
