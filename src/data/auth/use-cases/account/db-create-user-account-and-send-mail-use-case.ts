import { CreateUserAccountDTO, CreateUserAccountAndSendMailUseCase, CreateUserAccountUseCase } from '@/domain/auth'
import { SendToQueue } from '@/data/common/protocols'
import { HtmlTemplateParse, SendMailDTO } from '@/data/comunication/protocols'
import { ContactModel } from '@/domain/comunication'

export class DbCreateUserAccountAndSendMailUseCase implements CreateUserAccountAndSendMailUseCase {
  constructor (
    private readonly createUserAccountUseCase: CreateUserAccountUseCase,
    private readonly activeAccountEndPoint: string,
    private readonly welcomeMailFilePath: string,
    private readonly htmlTemplateParse: HtmlTemplateParse,
    private readonly sender: ContactModel,
    private readonly sendToQueue: SendToQueue,
    private readonly queueName: string
  ) {}

  async create (params: CreateUserAccountDTO): Promise<void> {
    const account = await this.createUserAccountUseCase.create(params)
    const content = await this.htmlTemplateParse.parse({
      filePath: this.welcomeMailFilePath,
      variables: {
        accountId: account.id,
        name: account.name,
        activeAccountEndPoint: this.activeAccountEndPoint
      }
    })
    await this.sendToQueue.sendToQueue<SendMailDTO>({
      queueName: this.queueName,
      params: {
        content,
        subject: '[NODE TS SKELETON]',
        sender: this.sender,
        to: {
          name: account.name,
          email: account.email
        }
      }
    })
  }
}
