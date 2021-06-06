import { LogoutController } from './logout-controller'
import { LogoutUseCaseSpy } from '@/domain/auth'
import { mockAuthenticatedRequest } from '@/presentation/auth/mocks'
import { noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'
import faker from 'faker'

type sutTypes = {
  sut: LogoutController
  requestValidator: RequestValidator
  logoutUseCaseSpy: LogoutUseCaseSpy
}

const makeSut = (): sutTypes => {
  const logoutUseCaseSpy = new LogoutUseCaseSpy()
  const requestValidator = new RequestValidator()
  const sut = new LogoutController(requestValidator, logoutUseCaseSpy)
  return {
    sut,
    requestValidator,
    logoutUseCaseSpy
  }
}

describe('LogoutController', () => {
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

  test('Should call LogoutUseCase with correct value', async () => {
    const { sut, logoutUseCaseSpy } = makeSut()
    const request = mockAuthenticatedRequest()
    await sut.handle(request)
    expect(logoutUseCaseSpy.sessionId).toBe(request.body.access_token.sessionId)
  })

  test('Should return serverError if LogoutUseCase return an exception', async () => {
    const { sut, logoutUseCaseSpy } = makeSut()
    jest.spyOn(logoutUseCaseSpy, 'logout').mockImplementationOnce((session: string) => { throw new Error() })
    const respose = await sut.handle(mockAuthenticatedRequest())
    expect(respose).toEqual(serverError(new Error()))
  })

  test('Should return noContent if LogoutUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockAuthenticatedRequest())
    expect(response).toEqual(noContent())
  })
})
