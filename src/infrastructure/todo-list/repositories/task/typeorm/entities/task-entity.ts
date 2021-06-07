import 'module-alias/register'
import { Column, Entity } from 'typeorm'
import { TaskState, TaskModel } from '@/domain/todo-list'
import { DefaultEntity } from '@/infrastructure/common/repositories'

@Entity('tasks')
export class TaskEntity extends DefaultEntity implements TaskModel {
  @Column()
  title: string

  @Column()
  description: string

  @Column()
  email: string

  @Column({
    type: 'enum',
    enum: TaskState
  })
  state: TaskState

  @Column()
  change_to_pending: number
}
