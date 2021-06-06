import { RabbitMQChannelSpy } from './rabbitmq-channel-mock'

export class RabbitMQConnectionSpy {
  constructor (private readonly channel: RabbitMQChannelSpy) {}

  async createChannel (): Promise<any> {
    return this.channel
  }
}
