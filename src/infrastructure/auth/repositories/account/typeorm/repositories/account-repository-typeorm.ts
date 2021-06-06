import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { AccountEntity } from '@/infrastructure/auth/repositories/account/typeorm'
import { CommonRepositoryTypeORM } from '@/infrastructure/common/repositories'
import { getRepository } from 'typeorm'

export class AccountRepositoryTypeORM extends CommonRepositoryTypeORM<AccountEntity> implements GetUserAccountByEmailRepository {
  constructor () {
    super(['name', 'email'])
    this.repositoryTypeORM = getRepository<AccountEntity>(AccountEntity)
  }

  async getByEmail (email: string): Promise<AccountEntity> {
    return await this.repositoryTypeORM.findOne({
      where: {
        email
      }
    })
  }
}
