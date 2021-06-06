import { RecoverPasswordController } from './recover-password-controller'
import { RecoverPasswordUseCaseSpy } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { mockRecoverPasswordRequest } from '@/presentation/auth/mocks'
import { noContent, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { InvalidCredentialsError } from '@/data/auth/errors'

type sutTypes = {
  sut: RecoverPasswordController
  validator: RequestValidator
  recoverPasswordUseCase: RecoverPasswordUseCaseSpy
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const recoverPasswordUseCase = new RecoverPasswordUseCaseSpy()
  const sut = new RecoverPasswordController(validator, recoverPasswordUseCase)
  return {
    sut,
    validator,
    recoverPasswordUseCase
  }
}

describe('RecoverPasswordController', () => {
  test('Should call RequestValidator with correct values', async () => {
    const { sut, validator } = makeSut()
    const request = mockRecoverPasswordRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValue(new Error())
    const result = await sut.handle(mockRecoverPasswordRequest())
    expect(result).toEqual(unprocessableEntity(new Error()))
  })

  test('Should call RecoverPasswordUseCase with correct values', async () => {
    const { sut, recoverPasswordUseCase } = makeSut()
    const request = mockRecoverPasswordRequest()
    await sut.handle(request)
    expect(recoverPasswordUseCase.params).toEqual({
      token: request.body.token,
      password: request.body.password
    })
  })

  test('Should return unauthorized if RecoverPasswordUseCase return InvalidCredentiaslError', async () => {
    const { sut, recoverPasswordUseCase } = makeSut()
    jest.spyOn(recoverPasswordUseCase, 'recoverPassword').mockImplementationOnce(() => { throw new InvalidCredentialsError() })
    const result = await sut.handle(mockRecoverPasswordRequest())
    expect(result).toEqual(unauthorized(new InvalidCredentialsError()))
  })

  test('Should return serverError if RecoverPasswordUseCase return an exception', async () => {
    const { sut, recoverPasswordUseCase } = makeSut()
    jest.spyOn(recoverPasswordUseCase, 'recoverPassword').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockRecoverPasswordRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return noContent if RecoverPasswordUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockRecoverPasswordRequest())
    expect(result).toEqual(noContent())
  })
})
