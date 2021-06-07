import { TaskModel } from '@/domain/todo-list'

export interface ChangeTaskToConcludedUseCase {
  concluded: (taskId: string) => Promise<TaskModel>
}
