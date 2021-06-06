import { DeleteSessionByAccountIdRepository } from '@/data/auth/repositories'
import { SessionEntity } from '@/infrastructure/auth/repositories/session/typeorm'
import { CommonRepositoryTypeORM } from '@/infrastructure/common/repositories'
import { getRepository } from 'typeorm'

export class SessionRepositoryTypeORM extends CommonRepositoryTypeORM<SessionEntity> implements DeleteSessionByAccountIdRepository {
  constructor () {
    super(['id'])
    this.repositoryTypeORM = getRepository<SessionEntity>(SessionEntity)
  }

  async deleteByAccountId (accountId: string): Promise<void> {
    await this.repositoryTypeORM.delete({
      account_id: accountId
    })
  }
}
