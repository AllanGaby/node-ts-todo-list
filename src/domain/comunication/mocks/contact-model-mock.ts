import { ContactModel } from '@/domain/comunication'
import faker from 'faker'

export const mockContactModel = (): ContactModel => ({
  name: faker.name.findName(),
  email: faker.internet.email()
})
