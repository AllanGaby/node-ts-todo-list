import { SendMailToMessageQueueDTO, mockContactModel } from '@/domain/comunication'
import faker from 'faker'

export const mockSendMailToMessageQueueDTO = (): SendMailToMessageQueueDTO => ({
  mailFilePath: faker.system.filePath(),
  subject: faker.random.words(),
  to: mockContactModel(),
  queueName: faker.random.uuid(),
  sender: mockContactModel(),
  variables: {
    [faker.database.column()]: faker.random.uuid(),
    [faker.database.column()]: faker.random.uuid(),
    [faker.database.column()]: faker.random.uuid()
  }
})
