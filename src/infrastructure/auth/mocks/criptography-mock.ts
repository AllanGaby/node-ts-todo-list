import { CompareHashDTO, EncryptModel } from '@/data/auth/protocols'
import faker from 'faker'

export const mockCompareHashDTO = (): CompareHashDTO => ({
  hash: faker.random.uuid(),
  payload: faker.random.uuid()
})

export const mockEncryptModel = (): EncryptModel => ({
  payload: { [faker.random.uuid()]: faker.random.uuid() },
  subject: faker.random.uuid()
})
