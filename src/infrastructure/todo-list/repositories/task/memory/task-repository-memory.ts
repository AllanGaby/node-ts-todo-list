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

  async update (params: Partial<TaskModel>): Promise<TaskModel> {
    const index = this.entities.findIndex(entity => entity.id === params.id)
    if (index >= 0) {
      this.entities[index] = {
        ...this.entities[index],
        ...params,
        change_to_pending: this.entities[index].change_to_pending + 1,
        updated_at: new Date()
      }
      return this.entities[index]
    }
    return null
  }
}
