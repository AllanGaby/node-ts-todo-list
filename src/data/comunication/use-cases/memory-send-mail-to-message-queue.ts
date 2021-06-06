import { SendToQueue } from '@/data/common/protocols'
import { SendMailToMessageQueueDTO, SendMailToMessageQueue } from '@/domain/comunication'
import { HtmlTemplateParse, SendMailDTO } from '@/data/comunication/protocols'

export class MemorySendMailToMessageQueue implements SendMailToMessageQueue {
  constructor (
    private readonly htmlTemplateParse: HtmlTemplateParse,
    private readonly sendToQueueAdapter: SendToQueue
  ) {}

  async sendToQueue (params: SendMailToMessageQueueDTO): Promise<void> {
    const content = await this.htmlTemplateParse.parse({
      filePath: params.mailFilePath,
      variables: params.variables
    })
    this.sendToQueueAdapter.sendToQueue<SendMailDTO>({
      queueName: params.queueName,
      params: {
        content,
        sender: params.sender,
        subject: params.subject,
        to: params.to
      }
    })
  }
}
