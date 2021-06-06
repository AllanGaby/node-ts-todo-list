import { RabbitMQAdapter } from './rabbitmq-adapter'
import { mockSendToQueueDTO, mockConsumeQueueDTO } from '@/data/common/mocks'
import { mockConsumeMessage, RabbitMQChannelSpy, RabbitMQConnectionSpy } from '@/infrastructure/common/mocks'
import RabbitMQ from 'amqplib'
import faker from 'faker'

const channel = new RabbitMQChannelSpy()
const connection = new RabbitMQConnectionSpy(channel)

jest.mock('amqplib', () => ({
  connect: (url: string) => { return connection }
}))

type sutTypes = {
  sut: RabbitMQAdapter
  rabbitMQHost: string
}

const makeSut = (): sutTypes => {
  const rabbitMQHost = faker.internet.url()
  const sut = new RabbitMQAdapter(rabbitMQHost)
  return {
    sut,
    rabbitMQHost
  }
}

describe('RabbitMQAdapter', () => {
  describe('SendToQueue Method', () => {
    test('Should call Connect with correct value', async () => {
      const { sut, rabbitMQHost } = makeSut()
      const connectSpy = jest.spyOn(RabbitMQ, 'connect')
      await sut.sendToQueue(mockSendToQueueDTO())
      expect(connectSpy).toHaveBeenCalledWith(rabbitMQHost)
    })

    test('Should call createChannel with correct value', async () => {
      const { sut } = makeSut()
      const createChannelSpy = jest.spyOn(connection, 'createChannel')
      await sut.sendToQueue(mockSendToQueueDTO())
      expect(createChannelSpy).toHaveBeenCalled()
    })

    test('Should call assertQueue with correct values', async () => {
      const { sut } = makeSut()
      const assertQueueSpy = jest.spyOn(channel, 'assertQueue')
      const request = mockSendToQueueDTO()
      await sut.sendToQueue(request)
      expect(assertQueueSpy).toHaveBeenCalledWith(request.queueName, {
        durable: true
      })
    })

    test('Should return throw if assertQueue throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(channel, 'assertQueue').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.sendToQueue(mockSendToQueueDTO())
      await expect(promise).rejects.toThrow()
    })

    test('Should call sendToQueue with correct values', async () => {
      const { sut } = makeSut()
      const sendToQueueSpy = jest.spyOn(channel, 'sendToQueue')
      const request = mockSendToQueueDTO()
      await sut.sendToQueue(request)
      expect(sendToQueueSpy).toHaveBeenCalledWith(request.queueName, Buffer.from(JSON.stringify(request.params)))
    })
  })

  describe('Consume Method', () => {
    test('Should call Connect with correct value', async () => {
      const { sut, rabbitMQHost } = makeSut()
      const connectSpy = jest.spyOn(RabbitMQ, 'connect')
      await sut.consume(mockConsumeQueueDTO())
      expect(connectSpy).toHaveBeenCalledWith(rabbitMQHost)
    })

    test('Should call createChannel with correct value', async () => {
      const { sut } = makeSut()
      const createChannelSpy = jest.spyOn(connection, 'createChannel')
      await sut.consume(mockConsumeQueueDTO())
      expect(createChannelSpy).toHaveBeenCalled()
    })

    test('Should call assertQueue with correct values', async () => {
      const { sut } = makeSut()
      const assertQueueSpy = jest.spyOn(channel, 'assertQueue')
      const request = mockConsumeQueueDTO()
      await sut.consume(request)
      expect(assertQueueSpy).toHaveBeenCalledWith(request.queueName, {
        durable: true
      })
    })

    test('Should call consume with correct value', async () => {
      const { sut } = makeSut()
      const request = mockConsumeQueueDTO()
      const consumeSpy = jest.spyOn(channel, 'consume')
      await sut.consume(request)
      expect(consumeSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('ExecuteQueue Method', () => {
    test('Should call JSON parse with correct value', async () => {
      const { sut } = makeSut()
      const parseSpyon = jest.spyOn(JSON, 'parse')
      const request = mockConsumeMessage()
      await sut.consume(mockConsumeQueueDTO())
      sut.executeQueue(request)
      expect(parseSpyon).toHaveBeenCalledWith(request.content.toString())
    })

    test('Should call executor with correct value', async () => {
      const { sut } = makeSut()
      const consumeDTO = mockConsumeQueueDTO()
      const request = mockConsumeMessage()
      const executeSpyon = jest.spyOn(consumeDTO.executor, 'execute')
      await sut.consume(consumeDTO)
      sut.executeQueue(request)
      expect(executeSpyon).toHaveBeenCalledWith(JSON.parse(request.content.toString()))
    })
  })
})
