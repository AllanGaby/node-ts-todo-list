import { RecoverPasswordUseCase, RecoverPasswordDTO, AccountModel } from '@/domain/auth'
import { DecryptWithSecret, CreateHash } from '@/data/auth/protocols'
import { DeleteSessionByAccountIdRepository } from '@/data/auth/repositories'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/data/common/repositories'
import { InvalidCredentialsError } from '@/data/auth/errors'
import { InvalidateCacheByPrefix } from '@/data/common/protocols'

export class DbRecoverPasswordUseCase implements RecoverPasswordUseCase {
  constructor (
    private readonly decryptWithSecret: DecryptWithSecret,
    private readonly getUserAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly createHash: CreateHash,
    private readonly updateUserAccountRepository: UpdateEntityRepository<AccountModel>,
    private readonly deleteSessionByAccountIdRepository: DeleteSessionByAccountIdRepository,
    private readonly invalidateCacheByPrefix: InvalidateCacheByPrefix
  ) {}

  async recoverPassword ({ token, password }: RecoverPasswordDTO): Promise<void> {
    try {
      const payload = await this.decryptWithSecret.decrypt(token)
      const accountById = await this.getUserAccountByIdRepository.getById(payload.subject)
      if (!accountById) {
        throw new InvalidCredentialsError()
      }
      const passwordHash = await this.createHash.hash(password)
      await this.updateUserAccountRepository.update({
        id: accountById.id,
        name: accountById.name,
        email: accountById.email,
        email_validated: accountById.email_validated,
        type: accountById.type,
        password: passwordHash
      })
      await this.deleteSessionByAccountIdRepository.deleteByAccountId(accountById.id)
      await this.invalidateCacheByPrefix.invalidateByPrefix(`account:${accountById.id}`)
    } catch {
      throw new InvalidCredentialsError()
    }
  }
}
