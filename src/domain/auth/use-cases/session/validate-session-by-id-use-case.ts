import { SessionModel } from '@/domain/auth'

export interface ValidateSessionByIdUseCase {
  validate: (sessionId: string) => Promise<SessionModel>
}
