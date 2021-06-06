import { EncryptModel } from '@/data/auth/protocols'
import faker from 'faker'

export const mockEncryptModel = (): EncryptModel => ({
  payload: { [faker.random.uuid()]: faker.random.uuid() },
  subject: faker.random.uuid()
})
