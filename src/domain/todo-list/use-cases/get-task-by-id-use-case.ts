import { GetEntityByIdUseCase } from '@/domain/common'
import { TaskModel } from '@/domain/todo-list'

export interface GetTaskByIdUseCase extends GetEntityByIdUseCase<TaskModel> {}
