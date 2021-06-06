import { AuthenticatedRequest } from '@/presentation/auth/middlewares'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockAuthenticatedMiddlewareRequest = (accessTokenName: string): HttpRequest<AuthenticatedRequest> => ({
  headers: {
    [accessTokenName]: faker.random.uuid()
  }
})
