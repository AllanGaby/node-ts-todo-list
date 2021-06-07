import { EntityModel } from '@/domain/common'
import { TaskState } from '@/domain/todo-list'

export type TaskModel = EntityModel & {
  title: string
  description: string
  email: string
  state: TaskState
  change_to_pending: number
}
