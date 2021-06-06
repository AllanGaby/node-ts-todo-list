export type SendToQueueDTO<ParamsType> = {
  queueName: string
  params: ParamsType
}

export interface SendToQueue {
  sendToQueue: <ParamsType>(params: SendToQueueDTO<ParamsType>) => Promise<boolean>
}
