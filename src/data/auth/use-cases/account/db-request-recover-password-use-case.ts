import { RequestRecoverPasswordUseCase } from '@/domain/auth'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { InvalidCredentialsError } from '@/data/auth/errors'
import { EncryptWithSecret } from '@/data/auth/protocols'
import { ContactModel, SendMailToMessageQueue } from '@/domain/comunication'

export class DbRequestRecoverPasswordUseCase implements RequestRecoverPasswordUseCase {
  constructor (
    private readonly getUserAccountByEmailRepository: GetUserAccountByEmailRepository,
    private readonly recoverPasswordTokenValidityInMinutes: number,
    private readonly encryptWithSecret: EncryptWithSecret,
    private readonly recoverPasswordMailFilePath: string,
    private readonly sendMailQueueName: string,
    private readonly sender: ContactModel,
    private readonly sendMailToMessageQueue: SendMailToMessageQueue
  ) {}

  async request (email: string): Promise<void> {
    const accountByEmail = await this.getUserAccountByEmailRepository.getByEmail(email)
    if (!accountByEmail) {
      throw new InvalidCredentialsError()
    }
    const token = await this.encryptWithSecret.encrypt({
      payload: {
        id: accountByEmail.id,
        name: accountByEmail.name,
        email: accountByEmail.email
      },
      subject: accountByEmail.id
    }, `${this.recoverPasswordTokenValidityInMinutes}m`)
    this.sendMailToMessageQueue.sendToQueue({
      queueName: this.sendMailQueueName,
      mailFilePath: this.recoverPasswordMailFilePath,
      sender: this.sender,
      subject: 'Welcome to back in Node TS Skeleton',
      to: {
        name: accountByEmail.name,
        email: accountByEmail.email
      },
      variables: {
        accountId: accountByEmail.id,
        name: accountByEmail.name,
        token
      }
    })
  }
}
