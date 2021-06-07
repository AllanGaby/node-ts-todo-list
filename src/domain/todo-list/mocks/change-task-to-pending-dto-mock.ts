import { ChangeTaskToPendingDTO } from '@/domain/todo-list'
import faker from 'faker'

export const mockChangeTaskToPendingDTO = (): ChangeTaskToPendingDTO => ({
  id: faker.random.uuid(),
  password: faker.internet.password()
})
