import { ChangeTaskToPendingUseCase, ChangeTaskToPendingDTO, TaskModel, mockTaskModel } from '@/domain/todo-list'

export class ChangeTaskToPendingUseCaseSpy implements ChangeTaskToPendingUseCase {
  params: ChangeTaskToPendingDTO
  task: TaskModel = mockTaskModel()

  async pending (paramsDTO: ChangeTaskToPendingDTO): Promise<TaskModel> {
    this.params = paramsDTO
    return this.task
  }
}
