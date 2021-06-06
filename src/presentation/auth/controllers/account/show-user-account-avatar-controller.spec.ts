import { ShowUserAccountvatarController } from './show-user-account-avatar-controller'
import { mockAccountModel, AccountModel } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { exportFile, noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import { GetEntityByIdUseCaseSpy } from '@/domain/common'
import { mockUserAccountIdParamsRequest } from '@/presentation/auth/mocks'
import faker from 'faker'

type sutTypes = {
  sut: ShowUserAccountvatarController
  paramsRequestValidator: RequestValidator
  getProfileByAccountIdUseCase: GetEntityByIdUseCaseSpy<AccountModel>
}

const makeSut = (): sutTypes => {
  const paramsRequestValidator = new RequestValidator()
  const getProfileByAccountIdUseCase = new GetEntityByIdUseCaseSpy<AccountModel>()
  getProfileByAccountIdUseCase.entity = mockAccountModel()
  const sut = new ShowUserAccountvatarController(paramsRequestValidator, getProfileByAccountIdUseCase)
  return {
    sut,
    paramsRequestValidator,
    getProfileByAccountIdUseCase
  }
}

describe('ShowUserAccountvatarController', () => {
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

  test('Should call GetProfileByAccountIdUseCase with correct values', async () => {
    const { sut, getProfileByAccountIdUseCase } = makeSut()
    const request = mockUserAccountIdParamsRequest()
    await sut.handle(request)
    expect(getProfileByAccountIdUseCase.entityId).toBe(request.params.account_id)
  })

  test('Should return notFound if GetProfileByAccountIdUseCase returns AccountIsNotFoundError', async () => {
    const { sut, getProfileByAccountIdUseCase } = makeSut()
    jest.spyOn(getProfileByAccountIdUseCase, 'getById').mockImplementationOnce(() => { throw new AccountIsNotFoundError() })
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(notFound())
  })

  test('Should return serverError if GetProfileByAccountIdUseCase returns a exception', async () => {
    const { sut, getProfileByAccountIdUseCase } = makeSut()
    jest.spyOn(getProfileByAccountIdUseCase, 'getById').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return ok if GetProfileByAccountIdUseCase succeeds and profile has avatar_path', async () => {
    const { sut, getProfileByAccountIdUseCase } = makeSut()
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(exportFile(getProfileByAccountIdUseCase.entity.avatar_path))
  })

  test('Should return noContent if GetProfileByAccountIdUseCase succeeds and profile hasnt avatar_path', async () => {
    const { sut, getProfileByAccountIdUseCase } = makeSut()
    delete getProfileByAccountIdUseCase.entity.avatar_path
    const result = await sut.handle(mockUserAccountIdParamsRequest())
    expect(result).toEqual(noContent())
  })
})
