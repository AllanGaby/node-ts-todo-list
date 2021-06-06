import { UpdateEntityController } from './update-entity-controller'
import { RequestValidator } from '@/validation/validations'
import { UpdateEntityUseCaseSpy } from '@/domain/common'
import { mockUpdateEntityRequest } from '@/presentation/common/mocks'
import { conflict, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: UpdateEntityController<object>
  validator: RequestValidator
  UpdateEntityUseCase: UpdateEntityUseCaseSpy<object>
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const UpdateEntityUseCase = new UpdateEntityUseCaseSpy<object>()
  const sut = new UpdateEntityController<object>(validator, UpdateEntityUseCase, 'id')
  return {
    sut,
    validator,
    UpdateEntityUseCase
  }
}

describe('UpdateEntityController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockUpdateEntityRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(Object(request.body))
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call UpdateEntityUseCase with correct value', async () => {
    const { sut, UpdateEntityUseCase } = makeSut()
    const request = mockUpdateEntityRequest()
    const UpdateSpy = jest.spyOn(UpdateEntityUseCase, 'update')
    await sut.handle(request)
    expect(UpdateSpy).toHaveBeenCalledWith(request.params.id, request.body)
  })

  test('Should return conflict if UpdateEntityUseCase return EntityAlreadyExistsError', async () => {
    const { sut, UpdateEntityUseCase } = makeSut()
    const entityName = faker.database.column()
    jest.spyOn(UpdateEntityUseCase, 'update').mockImplementationOnce(() => { throw new EntityAlreadyExistsError(entityName) })
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(conflict(new EntityAlreadyExistsError(entityName)))
  })

  test('Should return serverError if UpdateEntityUseCase return other error', async () => {
    const { sut, UpdateEntityUseCase } = makeSut()
    jest.spyOn(UpdateEntityUseCase, 'update').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return Updated if UpdateEntityUseCase is succeeds', async () => {
    const { sut, UpdateEntityUseCase } = makeSut()
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(ok(UpdateEntityUseCase.entity))
  })
})
