import { ChangeTaskToConcludedController } from './change-task-to-concluded-controller'
import { RequestValidator } from '@/validation/validations'
import { ChangeTaskToConcludedUseCaseSpy } from '@/domain/todo-list'
import { mockUpdateEntityRequest } from '@/presentation/common/mocks'
import { conflict, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityIsNotFoundError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: ChangeTaskToConcludedController
  validator: RequestValidator
  changeTaskToConcludedUseCase: ChangeTaskToConcludedUseCaseSpy
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const changeTaskToConcludedUseCase = new ChangeTaskToConcludedUseCaseSpy()
  const sut = new ChangeTaskToConcludedController(validator, changeTaskToConcludedUseCase)
  return {
    sut,
    validator,
    changeTaskToConcludedUseCase
  }
}

describe('ChangeTaskToConcludedController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockUpdateEntityRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(Object(request.params))
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call ChangeTaskToConcludedUseCase with correct value', async () => {
    const { sut, changeTaskToConcludedUseCase } = makeSut()
    const request = mockUpdateEntityRequest()
    const UpdateSpy = jest.spyOn(changeTaskToConcludedUseCase, 'concluded')
    await sut.handle(request)
    expect(UpdateSpy).toHaveBeenCalledWith(request.params.id)
  })

  test('Should return conflict if ChangeTaskToConcludedUseCase return EntityIsNotFoundError', async () => {
    const { sut, changeTaskToConcludedUseCase } = makeSut()
    const entityName = faker.database.column()
    jest.spyOn(changeTaskToConcludedUseCase, 'concluded').mockImplementationOnce(() => { throw new EntityIsNotFoundError(entityName) })
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(conflict(new EntityIsNotFoundError(entityName)))
  })

  test('Should return serverError if ChangeTaskToConcludedUseCase return other error', async () => {
    const { sut, changeTaskToConcludedUseCase } = makeSut()
    jest.spyOn(changeTaskToConcludedUseCase, 'concluded').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return Updated if ChangeTaskToConcludedUseCase is succeeds', async () => {
    const { sut, changeTaskToConcludedUseCase } = makeSut()
    const result = await sut.handle(mockUpdateEntityRequest())
    expect(result).toEqual(ok(changeTaskToConcludedUseCase.task))
  })
})
