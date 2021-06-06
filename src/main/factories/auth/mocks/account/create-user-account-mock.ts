import { CreateEntityRepository } from '@/data/common/repositories'
import { AccountModel, mockAccountType } from '@/domain/auth'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'
import { AuthRepositoryFactory } from '@/infrastructure/auth/repositories'
import { RepositoryType } from '@/infrastructure/common/repositories'
import faker from 'faker'

export const mockCreateUserAccount = async (password: string): Promise<AccountModel> => {
  const createHash = CriptographyFactory.makeCreateHash(13)
  const passwordHash = await createHash.hash(password)
  const account = await AuthRepositoryFactory.GetAccountRepository<CreateEntityRepository<AccountModel>>(RepositoryType.Memory).create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: passwordHash,
    type: mockAccountType(),
    email_validated: false
  })
  account.email_validated = true
  return account
}
