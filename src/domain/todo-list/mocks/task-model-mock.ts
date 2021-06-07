import { TaskModel, mockTaskState } from '@/domain/todo-list'
import faker from 'faker'

export const mockTaskModel = (): TaskModel => ({
  id: faker.random.uuid(),
  change_to_pending: 0,
  title: faker.random.words(),
  description: faker.random.words(),
  email: faker.internet.email(),
  state: mockTaskState(),
  created_at: faker.date.past(),
  updated_at: faker.date.past()
})
