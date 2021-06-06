import { ExecuteQueue } from '@/data/common/protocols'

export class ExecuteQueueSpy implements ExecuteQueue {
  params: any

  async execute (params: any): Promise<void> {
    this.params = params
  }
}
