import { CreateEntityController } from './create-entity-controller'
import { RequestValidator } from '@/validation/validations'
import { CreateEntityUseCaseSpy, EntityModel, mockEntityModel } from '@/domain/common'
import { mockCreateEntityRequest } from '@/presentation/common/mocks'
import { conflict, created, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: CreateEntityController<EntityModel>
  validator: RequestValidator
  createEntityUseCase: CreateEntityUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const createEntityUseCase = new CreateEntityUseCaseSpy<EntityModel>()
  const sut = new CreateEntityController<EntityModel>(validator, createEntityUseCase)
  return {
    sut,
    validator,
    createEntityUseCase
  }
}

describe('CreateEntityController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockCreateEntityRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(Object(request.body))
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call CreateEntityUseCase with correct value', async () => {
    const { sut, createEntityUseCase } = makeSut()
    const request = mockCreateEntityRequest()
    const createSpy = jest.spyOn(createEntityUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return conflict if CreateEntityUseCase return EntityAlreadyExistsError', async () => {
    const { sut, createEntityUseCase } = makeSut()
    const entityName = faker.database.column()
    jest.spyOn(createEntityUseCase, 'create').mockImplementationOnce(() => { throw new EntityAlreadyExistsError(entityName) })
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(conflict(new EntityAlreadyExistsError(entityName)))
  })

  test('Should return serverError if CreateEntityUseCase return other error', async () => {
    const { sut, createEntityUseCase } = makeSut()
    jest.spyOn(createEntityUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return created if CreateEntityUseCase is succeeds and CreateEntityUseCase returns a entity', async () => {
    const { sut, createEntityUseCase } = makeSut()
    createEntityUseCase.entity = mockEntityModel()
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(created(createEntityUseCase.entity))
  })

  test('Should return noContent if CreateEntityUseCase is succeeds and CreateEntityUseCase returns undefined', async () => {
    const { sut, createEntityUseCase } = makeSut()
    createEntityUseCase.entity = undefined
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(noContent())
  })
})
