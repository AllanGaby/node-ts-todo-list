import { TaskModel, ChangeTaskToConcludedUseCase, TaskState } from '@/domain/todo-list'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class DbChangeTaskToConcludedUseCase implements ChangeTaskToConcludedUseCase {
  constructor (
    private readonly getTaskByIdRepository: GetEntityByIdRepository<TaskModel>,
    private readonly updateTaskRepository: UpdateEntityRepository<TaskModel>
  ) {}

  async concluded (taskId: string): Promise<TaskModel> {
    const task = await this.getTaskByIdRepository.getById(taskId)
    if (!task) {
      throw new EntityIsNotFoundError('Task')
    }
    return await this.updateTaskRepository.update({
      ...task,
      state: TaskState.concluded
    })
  }
}
