import { UpdateUserAccountUseCase, UpdateUserAccountDTO, AccountModel } from '@/domain/auth'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { CompareHash, CreateHash } from '@/data/auth/protocols'
import { HtmlTemplateParse, SendMailDTO } from '@/data/comunication/protocols'
import { ContactModel } from '@/domain/comunication'
import { SendToQueue } from '@/data/common/protocols'
import { EmailInUseError, InvalidCredentialsError } from '@/data/auth/errors'

export class DbUpdateUserAccountUseCase implements UpdateUserAccountUseCase {
  constructor (
    private readonly getUserAccountByEmailRepository: GetUserAccountByEmailRepository,
    private readonly getUserAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly compareHash: CompareHash,
    private readonly createHash: CreateHash,
    private readonly changeEMailMailPath: string,
    private readonly updateUserAccountRepository: UpdateEntityRepository<AccountModel>,
    private readonly htmlTemplateParse: HtmlTemplateParse,
    private readonly sender: ContactModel,
    private readonly sendToQueue: SendToQueue,
    private readonly queueName: string
  ) {}

  async update (accountId: string, params: UpdateUserAccountDTO): Promise<AccountModel> {
    const accountByEmail = await this.getUserAccountByEmailRepository.getByEmail(params.email)
    if ((accountByEmail) && (accountByEmail.id !== accountId)) {
      throw new EmailInUseError()
    }
    const accountById = await this.getUserAccountByIdRepository.getById(accountId)
    if (!accountById) {
      throw new InvalidCredentialsError()
    }
    if ((params.old_password) && (!await this.compareHash.compare({ hash: accountById.password, payload: params.old_password }))) {
      throw new InvalidCredentialsError()
    }
    let passwordHash = accountById.password
    if (params.new_password) {
      passwordHash = await this.createHash.hash(params.new_password)
    }
    const emailIsChanged = params.email && params.email !== accountById.email
    const updatedAccount = await this.updateUserAccountRepository.update({
      id: accountId,
      password: passwordHash,
      name: params.name,
      email: emailIsChanged ? params.email : accountById.email,
      email_validated: emailIsChanged ? false : accountById.email_validated
    })
    if (emailIsChanged) {
      const content = await this.htmlTemplateParse.parse({
        filePath: this.changeEMailMailPath,
        variables: {
          accountId: updatedAccount.id,
          name: updatedAccount.name
        }
      })
      await this.sendToQueue.sendToQueue<SendMailDTO>({
        queueName: this.queueName,
        params: {
          content,
          subject: '[NODE TS SKELETON] - Welcome to back',
          sender: this.sender,
          to: {
            name: updatedAccount.name,
            email: updatedAccount.email
          }
        }
      })
    }
    return updatedAccount
  }
}
