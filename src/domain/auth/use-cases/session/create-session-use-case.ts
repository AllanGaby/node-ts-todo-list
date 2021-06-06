import { CreateEntityUseCase } from '@/domain/common'
import { SessionModel } from '@/domain/auth'

export type CreateSessionDTO = {
  account_id: string
}

export interface CreateSessionUseCase extends CreateEntityUseCase<SessionModel> {}
