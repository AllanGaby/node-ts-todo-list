import { DeleteSessionByAccountIdRepository } from '@/data/auth/repositories'
import { CreateEntityRepository } from '@/data/common/repositories'
import { CommonRepositoryMemory } from '@/infrastructure/common/repositories'
import { SessionModel } from '@/domain/auth'

export class SessionRepositoryMemory extends CommonRepositoryMemory<SessionModel> implements CreateEntityRepository<SessionModel>, DeleteSessionByAccountIdRepository {
  public static instance: SessionRepositoryMemory

  public static getRepository (): SessionRepositoryMemory {
    if (!SessionRepositoryMemory.instance) {
      SessionRepositoryMemory.instance = new SessionRepositoryMemory(['id'])
    }
    return SessionRepositoryMemory.instance
  }

  async deleteByAccountId (accountId: string): Promise<void> {
    this.entities = this.entities.filter(session => session.account_id !== accountId)
  }
}
