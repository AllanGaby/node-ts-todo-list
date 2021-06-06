import { ConsumeQueue, ConsumeQueueDTO } from '@/data/common/protocols'

export class ConsumeQueueSpy implements ConsumeQueue {
  params: ConsumeQueueDTO

  async consume (params: ConsumeQueueDTO): Promise<void> {
    this.params = params
  }
}
