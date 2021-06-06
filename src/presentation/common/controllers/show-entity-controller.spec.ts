import { ShowEntityController } from './show-entity-controller'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { GetEntityByIdUseCaseSpy } from '@/domain/common'
import { RequestValidator } from '@/validation/validations'
import { mockEntityIdParamsRequestDefault } from '@/presentation/common/mocks'
import { notFound, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import faker from 'faker'
import { EntityIsNotFoundError } from '@/data/common/errors'

type sutTypes = {
  sut: ShowEntityController<object, EntityIdParamsRequestDefault>
  requestValidator: RequestValidator
  getEntityByIdUseCase: GetEntityByIdUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const getEntityByIdUseCase = new GetEntityByIdUseCaseSpy()
  const sut = new ShowEntityController<object, EntityIdParamsRequestDefault>(requestValidator, getEntityByIdUseCase, 'id')
  return {
    sut,
    requestValidator,
    getEntityByIdUseCase
  }
}

describe('ShowEntityController', () => {
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

  test('Should call GetEntityByIdUseCase with correct value', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    const request = mockEntityIdParamsRequestDefault()
    await sut.handle(request)
    expect(getEntityByIdUseCase.entityId).toBe(request.params.id)
  })

  test('Should return notFound if GetEntityByIdUseCase return EntityIsNotFoundError', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    jest.spyOn(getEntityByIdUseCase, 'getById').mockImplementationOnce(() => { throw new EntityIsNotFoundError('Entity') })
    const response = await sut.handle(mockEntityIdParamsRequestDefault())
    expect(response).toEqual(notFound())
  })

  test('Should return serverError if GetEntityByIdUseCase return expcetion', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    jest.spyOn(getEntityByIdUseCase, 'getById').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockEntityIdParamsRequestDefault())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return ok if GetEntityByIdUseCase is succeeds', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    const response = await sut.handle(mockEntityIdParamsRequestDefault())
    expect(response).toEqual(ok(getEntityByIdUseCase.entity))
  })
})
