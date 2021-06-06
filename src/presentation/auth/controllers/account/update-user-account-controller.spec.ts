import { UpdateAuthenticatedUserAccountController } from './update-user-account-controller'
import { mockUpdateUserAccountRequest } from '@/presentation/auth/mocks'
import { RequestValidator } from '@/validation/validations'
import { UpdateUserAccountUseCaseSpy } from '@/domain/auth'
import { conflict, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EmailInUseError } from '@/data/auth/errors'

type sutTypes = {
  sut: UpdateAuthenticatedUserAccountController
  bodyRequestValidator: RequestValidator
  updateUserAccountUseCase: UpdateUserAccountUseCaseSpy
}

const makeSut = (): sutTypes => {
  const bodyRequestValidator = new RequestValidator()
  const updateUserAccountUseCase = new UpdateUserAccountUseCaseSpy()
  const sut = new UpdateAuthenticatedUserAccountController(bodyRequestValidator, updateUserAccountUseCase)
  return {
    sut,
    bodyRequestValidator,
    updateUserAccountUseCase
  }
}

describe('UpdateAuthenticatedUserAccountController', () => {
  test('Should call validator with correct values', async () => {
    const { sut, bodyRequestValidator } = makeSut()
    const validateSpy = jest.spyOn(bodyRequestValidator, 'validate')
    const request = mockUpdateUserAccountRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, bodyRequestValidator } = makeSut()
    jest.spyOn(bodyRequestValidator, 'validate').mockReturnValue(new Error())
    const result = await sut.handle(mockUpdateUserAccountRequest())
    expect(result).toEqual(unprocessableEntity(new Error()))
  })

  test('Should call UpdateUserAccountUseCase with correct value', async () => {
    const { sut, updateUserAccountUseCase } = makeSut()
    const request = mockUpdateUserAccountRequest()
    const updateSpy = jest.spyOn(updateUserAccountUseCase, 'update')
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request.body.access_token.accountId, {
      name: request.body.name,
      email: request.body.email,
      old_password: request.body.old_password,
      new_password: request.body.new_password
    })
  })

  test('Should return conflict if UpdateUserAccountUseCase return EmailIsInUseError', async () => {
    const { sut, updateUserAccountUseCase } = makeSut()
    jest.spyOn(updateUserAccountUseCase, 'update').mockImplementationOnce(() => { throw new EmailInUseError() })
    const result = await sut.handle(mockUpdateUserAccountRequest())
    expect(result).toEqual(conflict(new EmailInUseError()))
  })

  test('Should return serverError if UpdateUserAccountUseCase return other error', async () => {
    const { sut, updateUserAccountUseCase } = makeSut()
    jest.spyOn(updateUserAccountUseCase, 'update').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUpdateUserAccountRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return ok if UpdateUserAccountUseCase is succeeds', async () => {
    const { sut, updateUserAccountUseCase } = makeSut()
    const result = await sut.handle(mockUpdateUserAccountRequest())
    expect(result).toEqual(ok(updateUserAccountUseCase.account))
  })
})
