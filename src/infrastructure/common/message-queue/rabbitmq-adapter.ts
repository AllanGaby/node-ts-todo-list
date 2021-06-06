import { SendToQueue, SendToQueueDTO, ConsumeQueue, ConsumeQueueDTO, ExecuteQueue } from '@/data/common/protocols'
import { Channel, connect, ConsumeMessage } from 'amqplib'

export class RabbitMQAdapter implements SendToQueue, ConsumeQueue {
  private executor: ExecuteQueue
  constructor (private readonly url: string) {}

  private readonly getChannel = async (): Promise<Channel> => {
    const connection = await connect(this.url)
    return await connection.createChannel()
  }

  private readonly createQueue = async (channel: Channel, queueName: string): Promise<any> => {
    return await new Promise((resolve: any, reject: any) => {
      try {
        channel.assertQueue(queueName, { durable: true })
        resolve(channel)
      } catch (error) {
        reject(error)
      }
    })
  }

  async sendToQueue<ParamsType = any>({ queueName, params }: SendToQueueDTO<ParamsType>): Promise<boolean> {
    const channel = await this.getChannel()
    await this.createQueue(channel, queueName)
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(params)))
  }

  executeQueue (paramsRabbitMQ: ConsumeMessage): void {
    const params = JSON.parse(paramsRabbitMQ.content.toString())
    this.executor.execute(params)
  }

  async consume ({ queueName, executor }: ConsumeQueueDTO): Promise<any> {
    const channel = await this.getChannel()
    await this.createQueue(channel, queueName)
    this.executor = executor
    /* istanbul ignore next */
    channel.consume(queueName, (paramsRabbitMQ: ConsumeMessage) => this.executeQueue(paramsRabbitMQ), { noAck: true })
  }
}
