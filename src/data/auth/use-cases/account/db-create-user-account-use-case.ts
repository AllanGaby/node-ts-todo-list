import { CreateUserAccountUseCase, CreateUserAccountDTO, AccountModel, AccountType } from '@/domain/auth'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { CreateEntityRepository } from '@/data/common/repositories'
import { CreateHash } from '@/data/auth/protocols'
import { EmailInUseError } from '@/data/auth/errors'

export class DbCreateUserAccountUseCase implements CreateUserAccountUseCase {
  constructor (
    private readonly getUserAccountByEmailRepository: GetUserAccountByEmailRepository,
    private readonly createHash: CreateHash,
    private readonly createUserAccountRepository: CreateEntityRepository<AccountModel>,
    private readonly accountType: AccountType
  ) {}

  async create ({ name, email, password }: CreateUserAccountDTO): Promise<AccountModel> {
    const userAccountByEmail = await this.getUserAccountByEmailRepository.getByEmail(email)
    if (userAccountByEmail) {
      throw new EmailInUseError()
    }
    const passwordHash = await this.createHash.hash(password)
    return await this.createUserAccountRepository.create({
      name,
      email,
      password: passwordHash,
      type: this.accountType,
      email_validated: false
    })
  }
}
