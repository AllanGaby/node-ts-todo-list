import { RequestRecoverPasswordController } from './request-recover-password-controller'
import { RequestRecoverPasswordUseCaseSpy } from '@/domain/auth'
import { mockRequestRecoverPasswordRequest } from '@/presentation/auth/mocks'
import { noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { RequestValidator } from '@/validation/validations'
import faker from 'faker'

type sutTypes = {
  sut: RequestRecoverPasswordController
  requestValidator: RequestValidator
  requestRecoverPasswordUseCase: RequestRecoverPasswordUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const requestRecoverPasswordUseCase = new RequestRecoverPasswordUseCaseSpy()
  const sut = new RequestRecoverPasswordController(requestValidator, requestRecoverPasswordUseCase)
  return {
    sut,
    requestValidator,
    requestRecoverPasswordUseCase
  }
}

describe('RequestRecoverPasswordController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockRequestRecoverPasswordRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockRequestRecoverPasswordRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call RequestRecoverPasswordUseCase with correct value', async () => {
    const { sut, requestRecoverPasswordUseCase } = makeSut()
    const request = mockRequestRecoverPasswordRequest()
    await sut.handle(request)
    expect(requestRecoverPasswordUseCase.email).toBe(request.body.email)
  })

  test('Should return serverError if RequestRecoverPasswordUseCase return expcetion', async () => {
    const { sut, requestRecoverPasswordUseCase } = makeSut()
    jest.spyOn(requestRecoverPasswordUseCase, 'request').mockImplementationOnce((email: string) => { throw new Error() })
    const response = await sut.handle(mockRequestRecoverPasswordRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return noContent if RequestRecoverPasswordUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequestRecoverPasswordRequest())
    expect(response).toEqual(noContent())
  })
})
