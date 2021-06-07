import { TaskModel, ChangeTaskToPendingUseCase, ChangeTaskToPendingDTO, TaskState } from '@/domain/todo-list'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { EntityIsNotFoundError, AccessDeniedError, InvalidCredentialsError } from '@/data/common/errors'

export class DbChangeTaskToPendingUseCase implements ChangeTaskToPendingUseCase {
  constructor (
    private readonly getTaskByIdRepository: GetEntityByIdRepository<TaskModel>,
    private readonly updateTaskRepository: UpdateEntityRepository<TaskModel>
  ) {}

  async pending ({ id, password }: ChangeTaskToPendingDTO): Promise<TaskModel> {
    if (password !== 'TrabalheNaSaipos') {
      throw new InvalidCredentialsError()
    }
    const task = await this.getTaskByIdRepository.getById(id)
    if (!task) {
      throw new EntityIsNotFoundError('Task')
    }
    if (task.change_to_pending >= 2) {
      throw new AccessDeniedError()
    }
    return await this.updateTaskRepository.update({
      ...task,
      state: TaskState.pending
    })
  }
}
