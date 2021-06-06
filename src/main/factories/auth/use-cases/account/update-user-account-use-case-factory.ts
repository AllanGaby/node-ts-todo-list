import { AccountModel, UpdateUserAccountUseCase } from '@/domain/auth'
import { DbUpdateUserAccountUseCase } from '@/data/auth/use-cases'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'
import { HtmlTemplateFactory } from '@/infrastructure/comunication/html-template'
import { ContactModel } from '@/domain/comunication'
import { MessageQueueFactory } from '@/infrastructure/common/message-queue'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'

export type UpdateUserAccountUseCaseProps = {
  messageQueueHost: string
  repositoryType: RepositoryType
  salt: number
  changeEMailMailPath: string
  senderMail: ContactModel
  sendMailQueueName: string
}

export const makeUpdateUserAccountUseCase = ({ repositoryType, salt, changeEMailMailPath, senderMail, messageQueueHost, sendMailQueueName }: UpdateUserAccountUseCaseProps): UpdateUserAccountUseCase => {
  return new DbUpdateUserAccountUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetUserAccountByEmailRepository>(repositoryType),
    AuthRepositoryFactory.GetAccountRepository<GetEntityByIdRepository<AccountModel>>(repositoryType),
    CriptographyFactory.makeCompareHash(salt),
    CriptographyFactory.makeCreateHash(salt),
    changeEMailMailPath,
    AuthRepositoryFactory.GetAccountRepository<UpdateEntityRepository<AccountModel>>(repositoryType),
    HtmlTemplateFactory.makeHtmlTemplateParse(),
    senderMail,
    MessageQueueFactory.makeSendToQueue(messageQueueHost),
    sendMailQueueName
  )
}
