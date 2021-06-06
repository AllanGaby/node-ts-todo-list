import { HttpRequest, HttpResponse, HttpStatusCode } from '@/presentation/common/protocols'
import { EncryptedRequest } from '@/presentation/auth/middlewares'
import faker from 'faker'

export const mockEncryptedRequest = (): HttpRequest<EncryptedRequest> => ({
  body: {
    token: faker.random.uuid()
  }
})

export const mockEncryptedResponse = (statusCode: number = HttpStatusCode.ok): HttpResponse<object> => ({
  statusCode,
  body: faker.random.objectElement<object>()
})
