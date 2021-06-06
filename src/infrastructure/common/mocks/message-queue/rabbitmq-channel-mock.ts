import { ConsumeMessage } from 'amqplib'

export class RabbitMQChannelSpy {
  queueName: string
  onMessage: (msg: ConsumeMessage | null) => void

  async assertQueue (queueName: string, options: any): Promise<any> {

  }

  async sendToQueue (queueName: string, params: any): Promise<any> {

  }

  async consume (queueName: string, onMessage: (msg: ConsumeMessage | null) => void): Promise<any> {
    this.queueName = queueName
    this.onMessage = onMessage
  }
}
