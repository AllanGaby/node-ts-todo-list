export interface ExecuteQueue {
  execute: (params: any) => Promise<void>
}
