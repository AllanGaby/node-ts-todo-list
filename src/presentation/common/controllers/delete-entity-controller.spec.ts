import { DeleteEntityController } from './delete-entity-controller'
import { DeleteEntityByIdUseCaseSpy, EntityModel } from '@/domain/common'
import { RequestValidator } from '@/validation/validations'
import { mockEntityIdParamsRequestDefault } from '@/presentation/common/mocks'
import { noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import faker from 'faker'

type sutTypes = {
  sut: DeleteEntityController<EntityModel>
  requestValidator: RequestValidator
  deleteEntityByIdUseCase: DeleteEntityByIdUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const deleteEntityByIdUseCase = new DeleteEntityByIdUseCaseSpy<EntityModel>()
  const sut = new DeleteEntityController<EntityModel>(requestValidator, deleteEntityByIdUseCase, 'id')
  return {
    sut,
    requestValidator,
    deleteEntityByIdUseCase
  }
}

describe('DeleteEntityController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockEntityIdParamsRequestDefault()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.params)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockEntityIdParamsRequestDefault())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call DeleteEntityByIdUseCase with correct value', async () => {
    const { sut, deleteEntityByIdUseCase } = makeSut()
    const request = mockEntityIdParamsRequestDefault()
    await sut.handle(request)
    expect(deleteEntityByIdUseCase.entityId).toBe(request.params.id)
  })

  test('Should return serverError if DeleteEntityByIdUseCase return expcetion', async () => {
    const { sut, deleteEntityByIdUseCase } = makeSut()
    jest.spyOn(deleteEntityByIdUseCase, 'deleteById').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockEntityIdParamsRequestDefault())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return noContent if DeleteEntityByIdUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockEntityIdParamsRequestDefault())
    expect(response).toEqual(noContent())
  })
})
