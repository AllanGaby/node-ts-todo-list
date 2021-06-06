import { MemorySendActiveAccountMailUseCase } from './memory-send-active-account-mail-use-case'
import { ContactModel, mockContactModel, SendMailToMessageQueueSpy } from '@/domain/comunication'
import { mockSendActiveAccountMailDTO } from '@/domain/auth'
import faker from 'faker'

type sutTypes = {
  sut: MemorySendActiveAccountMailUseCase
  activeAccountEndPoint: string
  welcomeMailFilePath: string
  sendMailQueueName: string
  sendMailToMessageQueue: SendMailToMessageQueueSpy
  sender: ContactModel
}

const makeSut = (): sutTypes => {
  const activeAccountEndPoint = faker.internet.url()
  const welcomeMailFilePath = faker.system.filePath()
  const sendMailQueueName = faker.random.uuid()
  const sendMailToMessageQueue = new SendMailToMessageQueueSpy()
  const sender = mockContactModel()
  const sut = new MemorySendActiveAccountMailUseCase(activeAccountEndPoint, welcomeMailFilePath, sendMailQueueName, sender, sendMailToMessageQueue)
  return {
    sut,
    activeAccountEndPoint,
    welcomeMailFilePath,
    sendMailQueueName,
    sendMailToMessageQueue,
    sender
  }
}

describe('MemorySendActiveAccountMailUseCase', () => {
  test('Should call SendMailToMessageQueue with correct value', async () => {
    const { sut, sendMailToMessageQueue, activeAccountEndPoint, welcomeMailFilePath, sendMailQueueName, sender } = makeSut()
    const request = mockSendActiveAccountMailDTO()
    await sut.sendMail(request)
    expect(sendMailToMessageQueue.params).toEqual({
      to: {
        name: request.name,
        email: request.email
      },
      subject: 'Welcome to Node TS Skeleton',
      queueName: sendMailQueueName,
      mailFilePath: welcomeMailFilePath,
      sender: sender,
      variables: {
        accountId: request.accountId,
        name: request.name,
        activeAccountEndPoint: activeAccountEndPoint
      }
    })
  })
})
