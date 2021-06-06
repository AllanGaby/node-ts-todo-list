import { UploadUserAccountAvatarController } from './upload-user-account-avatar-controller'
import { mockUploadUserAccountAvatarRequest } from '@/presentation/auth/mocks'
import { UploadUserAccountAvatarUseCaseSpy } from '@/domain/auth'
import { RequestValidator } from '@/validation/validations'
import { noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { AccountIsNotFoundError } from '@/data/auth/errors'
import faker from 'faker'

type sutTypes = {
  sut: UploadUserAccountAvatarController
  paramsRequestValidator: RequestValidator
  bodyRequestValidator: RequestValidator
  uploadUserAccountAvatarUseCase: UploadUserAccountAvatarUseCaseSpy
}

const makeSut = (): sutTypes => {
  const paramsRequestValidator = new RequestValidator()
  const bodyRequestValidator = new RequestValidator()
  const uploadUserAccountAvatarUseCase = new UploadUserAccountAvatarUseCaseSpy()
  const sut = new UploadUserAccountAvatarController(paramsRequestValidator, bodyRequestValidator, uploadUserAccountAvatarUseCase)
  return {
    sut,
    paramsRequestValidator,
    bodyRequestValidator,
    uploadUserAccountAvatarUseCase
  }
}

describe('UploadUserAccountAvatarController', () => {
  test('Should call ParamsRequestValidator with correct values', async () => {
    const { sut, paramsRequestValidator } = makeSut()
    const validateSpy = jest.spyOn(paramsRequestValidator, 'validate')
    const request = mockUploadUserAccountAvatarRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.params)
  })

  test('Should return unprocessableEntity if ParamsRequestValidator fails', async () => {
    const { sut, paramsRequestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(paramsRequestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockUploadUserAccountAvatarRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call BodyRequestValidator with correct values', async () => {
    const { sut, bodyRequestValidator } = makeSut()
    const validateSpy = jest.spyOn(bodyRequestValidator, 'validate')
    const request = mockUploadUserAccountAvatarRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if BodyRequestValidator fails', async () => {
    const { sut, bodyRequestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(bodyRequestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockUploadUserAccountAvatarRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call UploadUserAccountAvatarUseCase with correct values', async () => {
    const { sut, uploadUserAccountAvatarUseCase } = makeSut()
    const request = mockUploadUserAccountAvatarRequest()
    await sut.handle(request)
    expect(uploadUserAccountAvatarUseCase.params).toEqual({
      account_id: request.params.account_id,
      avatar_path: request.body.avatar_path
    })
  })

  test('Should return conflict if UploadUserAccountAvatarUseCase returns AccountIsNotFoundError', async () => {
    const { sut, uploadUserAccountAvatarUseCase } = makeSut()
    jest.spyOn(uploadUserAccountAvatarUseCase, 'upload').mockImplementationOnce(() => { throw new AccountIsNotFoundError() })
    const result = await sut.handle(mockUploadUserAccountAvatarRequest())
    expect(result).toEqual(notFound())
  })

  test('Should return serverError if UploadUserAccountAvatarUseCase returns a exception', async () => {
    const { sut, uploadUserAccountAvatarUseCase } = makeSut()
    jest.spyOn(uploadUserAccountAvatarUseCase, 'upload').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUploadUserAccountAvatarRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return noContent if UploadUserAccountAvatarUseCase succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockUploadUserAccountAvatarRequest())
    expect(result).toEqual(noContent())
  })
})
