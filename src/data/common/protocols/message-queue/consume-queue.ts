import { ExecuteQueue } from './execute-queue'

export type ConsumeQueueDTO = {
  queueName: string
  executor: ExecuteQueue
}

export interface ConsumeQueue {
  consume: (params: ConsumeQueueDTO) => Promise<void>
}
