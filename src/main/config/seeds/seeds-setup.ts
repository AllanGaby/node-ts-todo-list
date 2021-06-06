import { AccountType } from '@/domain/auth'
import { Config } from '@/main/config/environment'
import { makeAuthSeed } from '@/main/factories/auth/seeds'

export const seedSetup = async (): Promise<void> => {
  await makeAuthSeed({
    repositoryType: Config.repositoryType,
    salt: Config.criptography.salt,
    name: Config.auth.manager.name,
    email: Config.auth.manager.email,
    password: Config.auth.manager.password,
    accountType: AccountType.manager
  })
}
