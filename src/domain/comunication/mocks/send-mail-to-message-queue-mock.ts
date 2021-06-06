import { SendMailToMessageQueue, SendMailToMessageQueueDTO } from '@/domain/comunication'

export class SendMailToMessageQueueSpy implements SendMailToMessageQueue {
  params: SendMailToMessageQueueDTO

  async sendToQueue (params: SendMailToMessageQueueDTO): Promise<void> {
    this.params = params
  }
}
