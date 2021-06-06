import { RequestRecoverPasswordUseCase } from '@/domain/auth'
import { DbRequestRecoverPasswordUseCase } from '@/data/auth/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { ContactModel } from '@/domain/comunication'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'
import { SendMailToMessageQueueProps, makeSendMailToMessageQueue } from '@/main/factories/comunication/use-cases'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'

export type RequestRecoverPasswordUseCaseProps = SendMailToMessageQueueProps & {
  repositoryType: RepositoryType
  recoverPasswordTokenValidityInMinutes: number
  recoverPasswordMailFilePath: string
  privateKey: string
  sendMailQueueName: string
  senderMail: ContactModel
}

export const makeRequestRecoverPasswordUseCase = ({ repositoryType, recoverPasswordTokenValidityInMinutes, recoverPasswordMailFilePath, privateKey, sendMailQueueName, senderMail, messageQueueHost }: RequestRecoverPasswordUseCaseProps): RequestRecoverPasswordUseCase => {
  return new DbRequestRecoverPasswordUseCase(
    AuthRepositoryFactory.GetAccountRepository<GetUserAccountByEmailRepository>(repositoryType),
    recoverPasswordTokenValidityInMinutes,
    CriptographyFactory.makeEncryptWithSecret(privateKey),
    recoverPasswordMailFilePath,
    sendMailQueueName,
    senderMail,
    makeSendMailToMessageQueue({ messageQueueHost })
  )
}
