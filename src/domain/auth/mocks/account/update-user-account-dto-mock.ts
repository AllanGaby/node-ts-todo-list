import { UpdateUserAccountDTO } from '@/domain/auth'
import faker from 'faker'

export const mockUpdateUserAccountDTO = (): UpdateUserAccountDTO => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  old_password: faker.internet.password(),
  new_password: faker.internet.password()
})
