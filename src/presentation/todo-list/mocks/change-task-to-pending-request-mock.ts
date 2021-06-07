import { ChangeTaskToPendingRequest } from '@/presentation/todo-list/requests'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockChangeTaskToPendingRequest = (): HttpRequest<ChangeTaskToPendingRequest, any, any, EntityIdParamsRequestDefault> => ({
  body: {
    password: 'TrabalheNaSaipos'
  },
  params: {
    id: faker.random.uuid()
  }
})
