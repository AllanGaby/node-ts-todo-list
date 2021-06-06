import { MemorySendMailToMessageQueue } from './memory-send-mail-to-message-queue'
import { SendToQueueSpy } from '@/data/common/mocks'
import { HtmlTemplateParseSpy } from '@/data/comunication/mocks'
import { mockSendMailToMessageQueueDTO } from '@/domain/comunication'

type sutTypes = {
  sut: MemorySendMailToMessageQueue
  htmlTemplateParse: HtmlTemplateParseSpy
  sendToQueue: SendToQueueSpy
}

const makeSut = (): sutTypes => {
  const htmlTemplateParse = new HtmlTemplateParseSpy()
  const sendToQueue = new SendToQueueSpy()
  const sut = new MemorySendMailToMessageQueue(htmlTemplateParse, sendToQueue)
  return {
    sut,
    htmlTemplateParse,
    sendToQueue
  }
}

describe('MemorySendMailToMessageQueue', () => {
  test('Should call HttpTemplateParse with correct value', async () => {
    const { sut, htmlTemplateParse } = makeSut()
    const request = mockSendMailToMessageQueueDTO()
    await sut.sendToQueue(request)
    expect(htmlTemplateParse.params).toEqual({
      filePath: request.mailFilePath,
      variables: request.variables
    })
  })

  test('Should call SendMail with correct values', async () => {
    const { sut, htmlTemplateParse, sendToQueue } = makeSut()
    const request = mockSendMailToMessageQueueDTO()
    await sut.sendToQueue(request)
    expect(sendToQueue.params).toEqual({
      queueName: request.queueName,
      params: {
        content: htmlTemplateParse.result,
        sender: request.sender,
        subject: request.subject,
        to: request.to
      }
    })
  })
})
