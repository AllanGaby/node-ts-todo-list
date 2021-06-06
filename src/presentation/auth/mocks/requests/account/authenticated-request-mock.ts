import { mockAccessTokenPayloadModel } from '@/domain/auth'
import { AuthenticatedRequest } from '@/presentation/auth/requests'
import { HttpRequest } from '@/presentation/common/protocols'

export const mockAuthenticatedRequest = (): HttpRequest<AuthenticatedRequest> => ({
  body: {
    access_token: mockAccessTokenPayloadModel()
  }
})
