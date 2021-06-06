import { EncryptedRequestMiddleware } from '@/presentation/auth/middlewares'
import { RSAFactory } from '@/infrastructure/auth/rsa'
import { makeEncryptedRequestValidator } from '@/main/factories/auth/request-validators'

export const makeEncryptedRequestMiddleware = (privateKey: string): EncryptedRequestMiddleware => {
  return new EncryptedRequestMiddleware(makeEncryptedRequestValidator(), RSAFactory.makeDecryptRequestWithPrivateKey(privateKey))
}
