import { AccountModel, ActiveUserAccountUseCase } from '@/domain/auth'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { AccountIsNotFoundError } from '@/data/auth/errors'

export class DbActiveUserAccountUseCase implements ActiveUserAccountUseCase {
  constructor (
    private readonly getUserAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly updateUserAccountRepository: UpdateEntityRepository<AccountModel>
  ) {}

  async active (accountId: string): Promise<AccountModel> {
    const accountById = await this.getUserAccountByIdRepository.getById(accountId)
    if (!accountById) {
      throw new AccountIsNotFoundError()
    }
    return await this.updateUserAccountRepository.update({
      id: accountById.id,
      name: accountById.name,
      email: accountById.email,
      password: accountById.password,
      email_validated: true,
      type: accountById.type
    })
  }
}
