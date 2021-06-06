import { RefreshAccessTokenController } from './refresh-access-token-controller'
import { CreateAccessTokenUseCaseSpy } from '@/domain/auth'
import { mockAuthenticatedRequest } from '@/presentation/auth/mocks'
import { ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'
import faker from 'faker'

type sutTypes = {
  sut: RefreshAccessTokenController
  requestValidator: RequestValidator
  createAccessTokenUseCase: CreateAccessTokenUseCaseSpy
}

const makeSut = (): sutTypes => {
  const createAccessTokenUseCase = new CreateAccessTokenUseCaseSpy()
  const requestValidator = new RequestValidator()
  const sut = new RefreshAccessTokenController(requestValidator, createAccessTokenUseCase)
  return {
    sut,
    requestValidator,
    createAccessTokenUseCase
  }
}

describe('RefreshAccessTokenController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockAuthenticatedRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body.access_token)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockAuthenticatedRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call CreateAccessTokenUseCase with correct value', async () => {
    const { sut, createAccessTokenUseCase } = makeSut()
    const request = mockAuthenticatedRequest()
    await sut.handle(request)
    expect(createAccessTokenUseCase.params).toBe(request.body.access_token)
  })

  test('Should return serverError if CreateAccessTokenUseCase return an exception', async () => {
    const { sut, createAccessTokenUseCase } = makeSut()
    jest.spyOn(createAccessTokenUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const respose = await sut.handle(mockAuthenticatedRequest())
    expect(respose).toEqual(serverError(new Error()))
  })

  test('Should return noContent if CreateAccessTokenUseCase is succeeds', async () => {
    const { sut, createAccessTokenUseCase } = makeSut()
    const response = await sut.handle(mockAuthenticatedRequest())
    expect(response).toEqual(ok(createAccessTokenUseCase.accessToken))
  })
})
