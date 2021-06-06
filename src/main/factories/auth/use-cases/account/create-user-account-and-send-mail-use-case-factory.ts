import { AccountType, CreateUserAccountAndSendMailUseCase } from '@/domain/auth'
import { DbCreateUserAccountAndSendMailUseCase } from '@/data/auth/use-cases'
import { ContactModel } from '@/domain/comunication'
import { makeCreateUserAccountUseCase, CreateUserAccountUseCaseProps } from './create-user-account-use-case-factory'
import { MessageQueueFactory } from '@/infrastructure/common/message-queue'
import { HtmlTemplateFactory } from '@/infrastructure/comunication/html-template'

export type CreateUserAccountAndSendMailUseCaseProps = CreateUserAccountUseCaseProps & {
  messageQueueHost: string
  sendMailQueueName: string
  activeAccountEndPoint: string
  welcomeMailFilePath: string
  senderMail: ContactModel
}

export const makeCreateUserAccountAndSendMailUseCase = ({
  repositoryType,
  salt,
  messageQueueHost,
  sendMailQueueName,
  activeAccountEndPoint,
  welcomeMailFilePath,
  senderMail
}: CreateUserAccountAndSendMailUseCaseProps): CreateUserAccountAndSendMailUseCase => {
  return new DbCreateUserAccountAndSendMailUseCase(
    makeCreateUserAccountUseCase({
      repositoryType,
      salt,
      accountType: AccountType.standard
    }),
    activeAccountEndPoint,
    welcomeMailFilePath,
    HtmlTemplateFactory.makeHtmlTemplateParse(),
    senderMail,
    MessageQueueFactory.makeSendToQueue(messageQueueHost),
    sendMailQueueName)
}
