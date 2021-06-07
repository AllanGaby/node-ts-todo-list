import { TaskState } from '@/domain/todo-list'
import faker from 'faker'

export const mockTaskState = (): TaskState => {
  return faker.random.arrayElement([TaskState.pending, TaskState.concluded])
}
