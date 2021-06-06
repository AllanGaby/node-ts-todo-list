import { SendToQueue, SendToQueueDTO } from '@/data/common/protocols'

export class SendToQueueSpy implements SendToQueue {
  params: SendToQueueDTO<any>
  result: boolean = true

  async sendToQueue <ParamsType>(params: SendToQueueDTO<ParamsType>): Promise<boolean> {
    this.params = params
    return this.result
  }
}
