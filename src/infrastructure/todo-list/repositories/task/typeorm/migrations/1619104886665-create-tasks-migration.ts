import { TaskState } from '@/domain/todo-list'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProfileMigration1619104886665 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'change_to_pending',
            type: 'integer',
            default: 0
          },
          {
            name: 'state',
            type: 'enum',
            enumName: 'tasks.state',
            default: "'pending'",
            enum: [
              TaskState.pending,
              TaskState.concluded
            ]
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks')
  }
}
