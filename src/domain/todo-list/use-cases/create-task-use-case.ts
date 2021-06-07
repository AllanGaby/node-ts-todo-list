import { CreateEntityUseCase } from '@/domain/common'
import { TaskModel } from '@/domain/todo-list'

export interface CreateTaskUseCase extends CreateEntityUseCase<TaskModel> {}
