import { TaskModel } from '@/domain/todo-list'
import { CommonRepositoryMemory } from '@/infrastructure/common/repositories'

export class TaskRepositoryMemory extends CommonRepositoryMemory<TaskModel> {
  public static instance: TaskRepositoryMemory

  public static getRepository (): TaskRepositoryMemory {
    if (!TaskRepositoryMemory.instance) {
      TaskRepositoryMemory.instance = new TaskRepositoryMemory()
    }
    return TaskRepositoryMemory.instance
  }
}
