import { EntityModel } from '@/domain/common'

export type SessionModel = EntityModel & {
  account_id: string
}
