import { LoginController } from './login-controller'
import { LoginDTO, LoginUseCaseSpy } from '@/domain/auth'
import { InvalidCredentialsError, InvalidStatusAccountError } from '@/data/auth/errors'
import { mockLoginRequest } from '@/presentation/auth/mocks'
import { RequestValidator } from '@/validation/validations'
import { unprocessableEntity, serverError, created, unauthorized } from '@/presentation/common/protocols'
import faker from 'faker'

type sutTypes = {
  sut: LoginController
  requestValidator: RequestValidator
  loginUseCase: LoginUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const loginUseCase = new LoginUseCaseSpy()
  const sut = new LoginController(requestValidator, loginUseCase)
  return {
    sut,
    requestValidator,
    loginUseCase
  }
}

describe('LoginController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockLoginRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockLoginRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call LoginUseCase with correct value', async () => {
    const { sut, loginUseCase } = makeSut()
    const request = mockLoginRequest()
    await sut.handle(request)
    expect(loginUseCase.params).toEqual({
      email: request.body.email,
      password: request.body.password
    })
  })

  test('Should return unauthorized if LoginUseCase return InvalidCredentialsError', async () => {
    const { sut, loginUseCase } = makeSut()
    jest.spyOn(loginUseCase, 'login').mockImplementationOnce((params: LoginDTO) => { throw new InvalidCredentialsError() })
    const response = await sut.handle(mockLoginRequest())
    expect(response).toEqual(unauthorized(new InvalidCredentialsError()))
  })

  test('Should return unauthorized if LoginUseCase return InvalidStatusAccountError', async () => {
    const { sut, loginUseCase } = makeSut()
    jest.spyOn(loginUseCase, 'login').mockImplementationOnce((params: LoginDTO) => { throw new InvalidStatusAccountError() })
    const response = await sut.handle(mockLoginRequest())
    expect(response).toEqual(unauthorized(new InvalidStatusAccountError()))
  })

  test('Should return serverError if LoginUseCase return expcetion', async () => {
    const { sut, loginUseCase } = makeSut()
    jest.spyOn(loginUseCase, 'login').mockImplementationOnce((params: LoginDTO) => { throw new Error() })
    const response = await sut.handle(mockLoginRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return created if LoginUseCase is succeeds', async () => {
    const { sut, loginUseCase } = makeSut()
    const response = await sut.handle(mockLoginRequest())
    expect(response).toEqual(created(loginUseCase.accessToken))
  })
})
