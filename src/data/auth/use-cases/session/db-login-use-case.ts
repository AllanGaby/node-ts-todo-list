import { LoginUseCase, LoginDTO, AccessTokenModel, CreateAccessTokenUseCase, SessionModel, CreateSessionUseCase } from '@/domain/auth'
import { GetUserAccountByEmailRepository } from '@/data/auth/repositories'
import { CompareHash } from '@/data/auth/protocols'
import { CreateCache } from '@/data/common/protocols'
import { InvalidCredentialsError, InvalidStatusAccountError } from '@/data/auth/errors'

export class DbLoginUseCase implements LoginUseCase {
  constructor (
    private readonly getUserAccountByEmailRepository: GetUserAccountByEmailRepository,
    private readonly compareHash: CompareHash,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly createCache: CreateCache,
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase
  ) {}

  async login ({ email, password }: LoginDTO): Promise<AccessTokenModel> {
    const accountByEmail = await this.getUserAccountByEmailRepository.getByEmail(email)
    if (!accountByEmail) {
      throw new InvalidCredentialsError()
    }
    if (!accountByEmail.email_validated) {
      throw new InvalidStatusAccountError()
    }
    const passwordIsCorrect = await this.compareHash.compare({
      payload: password,
      hash: accountByEmail.password
    })
    if (!passwordIsCorrect) {
      throw new InvalidCredentialsError()
    }
    const session = await this.createSessionUseCase.create({
      account_id: accountByEmail.id
    })
    await this.createCache.create<SessionModel>({
      key: `account:${session.account_id}&session:${session.id}`,
      record: session
    })
    return await this.createAccessTokenUseCase.create({
      sessionId: session.id,
      accountId: accountByEmail.id,
      name: accountByEmail.name,
      email: accountByEmail.email,
      accountType: accountByEmail.type
    })
  }
}
