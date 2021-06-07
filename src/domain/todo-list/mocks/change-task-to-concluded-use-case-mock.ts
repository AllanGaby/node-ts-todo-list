import { ChangeTaskToConcludedUseCase, TaskModel, mockTaskModel } from '@/domain/todo-list'

export class ChangeTaskToConcludedUseCaseSpy implements ChangeTaskToConcludedUseCase {
  taskId: string
  task: TaskModel = mockTaskModel()

  async concluded (taskId: string): Promise<TaskModel> {
    this.taskId = taskId
    return this.task
  }
}
