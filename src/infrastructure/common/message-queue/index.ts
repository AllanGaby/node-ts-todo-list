import { SendToQueue, ConsumeQueue } from '@/data/common/protocols'
import { RabbitMQAdapter } from './rabbitmq-adapter'

export class MessageQueueFactory {
  static makeSendToQueue = (url: string): SendToQueue => new RabbitMQAdapter(url)
  static makeConsumeQueue = (url: string): ConsumeQueue => new RabbitMQAdapter(url)
}
