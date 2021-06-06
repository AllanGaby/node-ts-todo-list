import { SendMailToMessageQueue } from '@/domain/comunication'
import { MemorySendMailToMessageQueue } from '@/data/comunication/use-cases'
import { HtmlTemplateFactory } from '@/infrastructure/comunication/html-template'
import { MessageQueueFactory } from '@/infrastructure/common/message-queue'

export type SendMailToMessageQueueProps = {
  messageQueueHost: string
}

export const makeSendMailToMessageQueue = ({ messageQueueHost }: SendMailToMessageQueueProps): SendMailToMessageQueue => {
  return new MemorySendMailToMessageQueue(
    HtmlTemplateFactory.makeHtmlTemplateParse(),
    MessageQueueFactory.makeSendToQueue(messageQueueHost)
  )
}
