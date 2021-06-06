import { EncryptedRequestMiddleware } from './encrypted-request-middleware'
import { DecryptRequestWithPrivateKeySpy } from '@/data/auth/mocks'
import { mockEncryptedRequest } from '@/presentation/auth/mocks'
import { unprocessableEntity, ok } from '@/presentation/common/protocols'
import { InvalidEncryptedTokenError } from '@/presentation/auth/errors'
import { RequestValidator } from '@/validation/validations'
import faker from 'faker'

type sutTypes = {
  sut: EncryptedRequestMiddleware
  requestValidator: RequestValidator
  decryptRequestWithPrivateKey: DecryptRequestWithPrivateKeySpy
}

const makeSut = (): sutTypes => {
  const decryptRequestWithPrivateKey = new DecryptRequestWithPrivateKeySpy()
  const requestValidator = new RequestValidator()
  const sut = new EncryptedRequestMiddleware(requestValidator, decryptRequestWithPrivateKey)
  return {
    sut,
    requestValidator,
    decryptRequestWithPrivateKey
  }
}

describe('EncryptedRequestMiddleware', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockEncryptedRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockEncryptedRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call DecryptRequestWithPrivateKey with correct value', async () => {
    const { sut, decryptRequestWithPrivateKey } = makeSut()
    const request = mockEncryptedRequest()
    await sut.handle(request)
    expect(decryptRequestWithPrivateKey.token).toEqual(request.body.token)
  })

  test('Should return Unprocessable Entity status code if DecryptRequestWithPrivateKey return an exception', async () => {
    const { sut, decryptRequestWithPrivateKey } = makeSut()
    jest.spyOn(decryptRequestWithPrivateKey, 'decrypt').mockImplementationOnce(() => { throw new InvalidEncryptedTokenError() })
    const response = await sut.handle(mockEncryptedRequest())
    expect(response).toEqual(unprocessableEntity(new InvalidEncryptedTokenError()))
  })

  test('Should return Ok status code if decrypt is succeeds', async () => {
    const { sut, decryptRequestWithPrivateKey } = makeSut()
    const body = faker.random.objectElement<object>()
    jest.spyOn(decryptRequestWithPrivateKey, 'decrypt').mockImplementationOnce((): string => { return JSON.stringify(body) })
    const response = await sut.handle(mockEncryptedRequest())
    expect(response).toEqual(ok<object>(body))
  })
})
