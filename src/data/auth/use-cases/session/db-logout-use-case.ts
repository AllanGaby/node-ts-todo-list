import { LogoutUseCase, SessionModel } from '@/domain/auth'
import { DeleteEntityByIdRepository } from '@/data/common/repositories'
import { InvalidateCacheByKey } from '@/data/common/protocols'

export class DbLogoutUseCase implements LogoutUseCase {
  constructor (
    private readonly invalidateCacheByKey: InvalidateCacheByKey,
    private readonly deleteSessionByIdRepository: DeleteEntityByIdRepository<SessionModel>
  ) {}

  async logout (sessionId: string): Promise<void> {
    await this.invalidateCacheByKey.invalidateByKey(`session:${sessionId}`)
    await this.deleteSessionByIdRepository.deleteById(sessionId)
  }
}
