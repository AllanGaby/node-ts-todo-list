import { SendToQueueDTO } from '@/data/common/protocols'
import faker from 'faker'

export const mockSendToQueueDTO = (): SendToQueueDTO<object> => ({
  queueName: faker.random.uuid(),
  params: faker.random.objectElement<object>()
})
