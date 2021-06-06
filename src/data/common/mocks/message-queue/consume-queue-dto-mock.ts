import { ConsumeQueueDTO } from '@/data/common/protocols'
import { ExecuteQueueSpy } from './execute-queue-mock'
import faker from 'faker'

export const mockConsumeQueueDTO = (): ConsumeQueueDTO => ({
  queueName: faker.random.uuid(),
  executor: new ExecuteQueueSpy()
})
