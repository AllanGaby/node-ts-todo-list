import { DeleteUserAccountAvatarController } from './delete-user-account-avatar-controller'
import { DeleteUserAccountAvatarUseCaseSpy } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import { mockUserAccountIdParamsRequest } from '@/presentation/auth/mocks'
import faker from 'faker'

type sutTypes = {
  sut: DeleteUserAccountAvatarController
  paramsRequestValidator: RequestValidator
  deleteUserAccountAvatarUseCase: DeleteUserAccountAvatarUseCaseSpy
}

const makeSut = (): sutTypes => {
  const paramsRequestValidator = new RequestValidator()
  const deleteUserAccountAvatarUseCase = new DeleteUserAccountAvatarUseCaseSpy()
  const sut = new DeleteUserAccountAvatarController(paramsRequestValidator, deleteUserAccountAvatarUseCase)
  return {
    sut,
    paramsRequestValidator,
    deleteUserAccountAvatarUseCase
  }
}

describe('DeleteUserAccountAvatarController', () => {
  test('Should call ParamsRequestValidator with correct values', async () => {
    const { sut, paramsRequestValidator } = makeSut()
    const validateSpy = jest.spyOn(paramsRequestValidator, 'validate')
    const request = mockUserAccountIdParamsRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.params)
  })

  test('Should return unprocessableEntity if ParamsRequestValidator fails', async () => {
    const { sut, paramsRequestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(paramsRequestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockUserAccountIdParamsRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call DeleteUserAccountAvatarUseCase with correct values', async () => {
    const { sut, deleteUserAccountAvatarUseCase } = makeSut()
    const request = mockUserAccountIdParamsRequest()
    await sut.handle(request)
    expect(deleteUserAccountAvatarUseCase.accountId).toBe(request.params.account_id)
  })

  test('Should return conflict if DeleteUserAccountAvatarUseCase returns AccountIsNotFoundError', async () => {
    const { sut, deleteUserAccountAvatarUseCase } = makeSut()
    jest.spyOn(deleteUserAccountAvatarUseCase, 'deleteAvatar').mockImplementationOnce(() => { throw new AccountIsNotFoundError() })
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(notFound())
  })

  test('Should return serverError if DeleteUserAccountAvatarUseCase returns a exception', async () => {
    const { sut, deleteUserAccountAvatarUseCase } = makeSut()
    jest.spyOn(deleteUserAccountAvatarUseCase, 'deleteAvatar').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return noContent if DeleteUserAccountAvatarUseCase succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(noContent())
  })
})
