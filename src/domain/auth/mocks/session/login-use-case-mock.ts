import { LoginDTO, LoginUseCase, AccessTokenModel, mockAccessTokenModel } from '@/domain/auth'

export class LoginUseCaseSpy implements LoginUseCase {
  params: LoginDTO
  accessToken: AccessTokenModel = mockAccessTokenModel()

  async login (params: LoginDTO): Promise<AccessTokenModel> {
    this.params = params
    return this.accessToken
  }
}
