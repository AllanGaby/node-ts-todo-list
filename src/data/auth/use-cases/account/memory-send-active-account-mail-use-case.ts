import { SendActiveAccountMailDTO, SendActiveAccountMailUseCase } from '@/domain/auth'
import { ContactModel, SendMailToMessageQueue } from '@/domain/comunication'

export class MemorySendActiveAccountMailUseCase implements SendActiveAccountMailUseCase {
  constructor (
    private readonly activeAccountEndPoint: string,
    private readonly welcomeMailFilePath: string,
    private readonly sendMailQueueName: string,
    private readonly sender: ContactModel,
    private readonly sendMailToMessageQueue: SendMailToMessageQueue
  ) {}

  async sendMail (params: SendActiveAccountMailDTO): Promise<void> {
    this.sendMailToMessageQueue.sendToQueue({
      to: {
        name: params.name,
        email: params.email
      },
      subject: 'Welcome to Node TS Skeleton',
      queueName: this.sendMailQueueName,
      mailFilePath: this.welcomeMailFilePath,
      sender: this.sender,
      variables: {
        accountId: params.accountId,
        name: params.name,
        activeAccountEndPoint: this.activeAccountEndPoint
      }
    })
  }
}
