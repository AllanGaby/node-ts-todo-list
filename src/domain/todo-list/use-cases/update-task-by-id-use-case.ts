import { UpdateEntityUseCase } from '@/domain/common'
import { TaskModel } from '@/domain/todo-list'

export interface UpdateTaskUseCase extends UpdateEntityUseCase<TaskModel> {}
