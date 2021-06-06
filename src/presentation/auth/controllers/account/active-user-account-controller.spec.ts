import { ActiveUserAccountController } from './active-user-account-controller'
import { RequestValidator } from '@/validation/validations'
import { ActiveUserAccountUseCaseSpy } from '@/domain/auth'
import { mockActiveUserAccountRequest } from '@/presentation/auth/mocks'
import { noContent, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { AccountIsNotFoundError } from '@/data/auth/errors'

type sutTypes = {
  sut: ActiveUserAccountController
  validator: RequestValidator
  activeUserAccountUseCase: ActiveUserAccountUseCaseSpy
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const activeUserAccountUseCase = new ActiveUserAccountUseCaseSpy()
  const sut = new ActiveUserAccountController(validator, activeUserAccountUseCase)
  return {
    sut,
    validator,
    activeUserAccountUseCase
  }
}

describe('ActiveUserAccountController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockActiveUserAccountRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.params)
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockActiveUserAccountRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call ActiveUserAccountUseCase with correct value', async () => {
    const { sut, activeUserAccountUseCase } = makeSut()
    const request = mockActiveUserAccountRequest()
    const activeSpy = jest.spyOn(activeUserAccountUseCase, 'active')
    await sut.handle(request)
    expect(activeSpy).toHaveBeenCalledWith(request.params.account_id)
  })

  test('Should return unauthorized if ActiveUserAccountUseCase return AccountIsNotFoundError', async () => {
    const { sut, activeUserAccountUseCase } = makeSut()
    jest.spyOn(activeUserAccountUseCase, 'active').mockImplementationOnce(() => { throw new AccountIsNotFoundError() })
    const result = await sut.handle(mockActiveUserAccountRequest())
    expect(result).toEqual(unauthorized(new AccountIsNotFoundError()))
  })

  test('Should return serverError if ActiveUserAccountUseCase return an expection', async () => {
    const { sut, activeUserAccountUseCase } = makeSut()
    jest.spyOn(activeUserAccountUseCase, 'active').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockActiveUserAccountRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return noContent if succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockActiveUserAccountRequest())
    expect(result).toEqual(noContent())
  })
})
