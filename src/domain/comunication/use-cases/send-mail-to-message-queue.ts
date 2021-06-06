import { ContactModel, HtmlTemplateVariables } from '@/domain/comunication'

export type SendMailToMessageQueueDTO = {
  queueName: string
  mailFilePath: string
  subject: string
  to: ContactModel
  sender: ContactModel
  variables: HtmlTemplateVariables
}

export interface SendMailToMessageQueue {
  sendToQueue: (params: SendMailToMessageQueueDTO) => Promise<void>
}
