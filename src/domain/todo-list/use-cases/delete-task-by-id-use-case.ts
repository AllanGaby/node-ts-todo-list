import { DeleteEntityByIdUseCase } from '@/domain/common'
import { TaskModel } from '@/domain/todo-list'

export interface DeleteTaskByIdUseCase extends DeleteEntityByIdUseCase<TaskModel> {}
