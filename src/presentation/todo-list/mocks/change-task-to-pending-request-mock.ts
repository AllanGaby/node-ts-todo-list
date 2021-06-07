import { ChangeTaskToPendingRequest } from '@/presentation/todo-list/requests'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockChangeTaskToPendingRequest = (): HttpRequest<ChangeTaskToPendingRequest, any, any, EntityIdParamsRequestDefault> => ({
  body: {
    password: faker.internet.password()
  },
  params: {
    id: faker.random.uuid()
  }
})
