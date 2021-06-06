import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createAccountMigration1616072551423 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'avatar_path',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'type',
            type: 'enum',
            enumName: 'account_types',
            enum: [
              'standard',
              'manager'
            ]
          },
          {
            name: 'email_validated',
            type: 'boolean',
            default: false
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
    await queryRunner.dropTable('accounts')
  }
}
