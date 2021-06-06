import { RecoverCacheByKey } from '@/data/common/protocols'
import { ValidateSessionByIdUseCase, SessionModel } from '@/domain/auth'
import { GetEntityByIdRepository } from '@/data/common/repositories'
import { SessionNotFoundError } from '@/data/auth/errors'

export class DbValidateSessionByIdUseCase implements ValidateSessionByIdUseCase {
  constructor (
    private readonly recoverCacheByKey: RecoverCacheByKey,
    private readonly getSessionByIdRepository: GetEntityByIdRepository<SessionModel>

  ) {}

  async validate (sessionId: string): Promise<SessionModel> {
    const cacheSession = await this.recoverCacheByKey.recover<SessionModel>(`session:${sessionId}`)
    if (cacheSession) {
      return cacheSession
    }
    const sessionById = await this.getSessionByIdRepository.getById(sessionId)
    if (!sessionById) {
      throw new SessionNotFoundError()
    }
    return sessionById
  }
}
