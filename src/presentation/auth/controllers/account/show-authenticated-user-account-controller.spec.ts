import { ShowAuthenticatedUserAccountController } from './show-authenticated-user-account-controller'
import { RequestValidator } from '@/validation/validations'
import { AccountModel } from '@/domain/auth'
import { GetEntityByIdUseCaseSpy } from '@/domain/common'
import { mockAuthenticatedRequest } from '@/presentation/auth/mocks'
import { ok, serverError, unauthorized, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityIsNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: ShowAuthenticatedUserAccountController
  requestValidator: RequestValidator
  showUserAccountByAccountIdUseCase: GetEntityByIdUseCaseSpy<AccountModel>
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const showUserAccountByAccountIdUseCase = new GetEntityByIdUseCaseSpy<AccountModel>()
  const sut = new ShowAuthenticatedUserAccountController(requestValidator, showUserAccountByAccountIdUseCase)
  return {
    sut,
    requestValidator,
    showUserAccountByAccountIdUseCase
  }
}

describe('ShowAuthenticatedUserAccountController', () => {
  test('Shoul call RequestValidator with correct values', async () => {
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

  test('Should call ShowUserAccountByAccountIdUseCase with correct value', async () => {
    const { sut, showUserAccountByAccountIdUseCase } = makeSut()
    const request = mockAuthenticatedRequest()
    await sut.handle(request)
    expect(showUserAccountByAccountIdUseCase.entityId).toEqual(request.body.access_token.accountId)
  })

  test('Should return unauthorized if ShowUserAccountByAccountIdUseCase return EntityIsNotFoundError', async () => {
    const { sut, showUserAccountByAccountIdUseCase } = makeSut()
    jest.spyOn(showUserAccountByAccountIdUseCase, 'getById').mockImplementationOnce((accountId: string) => { throw new EntityIsNotFoundError('Account') })
    const result = await sut.handle(mockAuthenticatedRequest())
    expect(result).toEqual(unauthorized(new EntityIsNotFoundError('Account')))
  })

  test('Should return serverError if ShowUserAccountByAccountIdUseCase return an exception', async () => {
    const { sut, showUserAccountByAccountIdUseCase } = makeSut()
    jest.spyOn(showUserAccountByAccountIdUseCase, 'getById').mockImplementationOnce((accountId: string) => { throw new Error() })
    const result = await sut.handle(mockAuthenticatedRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return ok if ShowUserAccountByAccountIdUseCase is succeeds', async () => {
    const { sut, showUserAccountByAccountIdUseCase } = makeSut()
    const result = await sut.handle(mockAuthenticatedRequest())
    expect(result).toEqual(ok(showUserAccountByAccountIdUseCase.entity))
  })
})
