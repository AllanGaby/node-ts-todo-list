import 'module-alias/register'
import { Column, Entity } from 'typeorm'
import { SessionModel } from '@/domain/auth'
import { DefaultEntity } from '@/infrastructure/common/repositories'

@Entity('sessions')
export class SessionEntity extends DefaultEntity implements SessionModel {
  @Column('uuid')
  account_id: string
}
