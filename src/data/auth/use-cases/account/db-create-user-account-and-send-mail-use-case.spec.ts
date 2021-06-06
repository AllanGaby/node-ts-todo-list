import { DbCreateUserAccountAndSendMailUseCase } from './db-create-user-account-and-send-mail-use-case'
import { CreateUserAccountUseCaseSpy, mockCreateUserAccountDTO } from '@/domain/auth'
import { SendToQueueSpy } from '@/data/common/mocks'
import { HtmlTemplateParseSpy } from '@/data/comunication/mocks'
import { ContactModel, mockContactModel } from '@/domain/comunication'
import faker from 'faker'

type sutTypes = {
  sut: DbCreateUserAccountAndSendMailUseCase
  createUserAccountUseCase: CreateUserAccountUseCaseSpy
  activeAccountEndPoint: string
  welcomeMailFilePath: string
  htmlTemplateParse: HtmlTemplateParseSpy
  sender: ContactModel
  queueName: string
  sendToQueue: SendToQueueSpy
}

const makeSut = (): sutTypes => {
  const createUserAccountUseCase = new CreateUserAccountUseCaseSpy()
  const activeAccountEndPoint = faker.internet.url()
  const welcomeMailFilePath = faker.system.filePath()
  const htmlTemplateParse = new HtmlTemplateParseSpy()
  const sender = mockContactModel()
  const queueName = faker.random.uuid()
  const sendToQueue = new SendToQueueSpy()
  const sut = new DbCreateUserAccountAndSendMailUseCase(createUserAccountUseCase, activeAccountEndPoint, welcomeMailFilePath, htmlTemplateParse, sender, sendToQueue, queueName)
  return {
    sut,
    createUserAccountUseCase,
    activeAccountEndPoint,
    welcomeMailFilePath,
    htmlTemplateParse,
    sender,
    sendToQueue,
    queueName
  }
}

describe('DbCreateUserAccountAndSendMailUseCase', () => {
  test('Should call CreateUserAccountUseCase with correct value', async () => {
    const { sut, createUserAccountUseCase } = makeSut()
    const request = mockCreateUserAccountDTO()
    await sut.create(request)
    expect(createUserAccountUseCase.params).toEqual(request)
  })

  test('Should call HttpTemplateParse with correct values', async () => {
    const { sut, createUserAccountUseCase, htmlTemplateParse, welcomeMailFilePath, activeAccountEndPoint } = makeSut()
    await sut.create(mockCreateUserAccountDTO())
    expect(htmlTemplateParse.params).toEqual({
      filePath: welcomeMailFilePath,
      variables: {
        accountId: createUserAccountUseCase.account.id,
        name: createUserAccountUseCase.account.name,
        activeAccountEndPoint: activeAccountEndPoint
      }
    })
  })

  test('Should call SendToQueue with correct value', async () => {
    const { sut, createUserAccountUseCase, sendToQueue, queueName, sender, htmlTemplateParse } = makeSut()
    await sut.create(mockCreateUserAccountDTO())
    expect(sendToQueue.params).toEqual({
      queueName: queueName,
      params: {
        content: htmlTemplateParse.result,
        subject: '[NODE TS SKELETON]',
        sender: sender,
        to: {
          name: createUserAccountUseCase.account.name,
          email: createUserAccountUseCase.account.email
        }
      }
    })
  })
})
