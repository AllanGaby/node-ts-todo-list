import { ListEntitiesUseCase } from '@/domain/common'
import { TaskModel } from '@/domain/todo-list'

export interface ListTasksUseCase extends ListEntitiesUseCase<TaskModel> {}
