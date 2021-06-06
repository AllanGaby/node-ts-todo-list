import { CreateAccessTokenUseCase, AccessTokenPayloadModel, AccessTokenModel } from '@/domain/auth'
import { mockAccessTokenModel } from './access-token-model-mock'

export class CreateAccessTokenUseCaseSpy implements CreateAccessTokenUseCase {
  params: AccessTokenPayloadModel
  accessToken: AccessTokenModel = mockAccessTokenModel()

  async create (params: AccessTokenPayloadModel): Promise<AccessTokenModel> {
    this.params = params
    return this.accessToken
  }
}
