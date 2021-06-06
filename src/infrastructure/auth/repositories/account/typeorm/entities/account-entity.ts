import 'module-alias/register'
import { Column, Entity } from 'typeorm'
import { AccountModel, AccountType } from '@/domain/auth'
import { DefaultEntity } from '@/infrastructure/common/repositories'

@Entity('accounts')
export class AccountEntity extends DefaultEntity implements AccountModel {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    nullable: true
  })
  avatar_path?: string

  @Column({
    type: 'enum',
    enum: AccountType
  })
  type: AccountType

  @Column()
  email_validated: boolean
}
