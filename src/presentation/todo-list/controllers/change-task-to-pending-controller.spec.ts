import { ChangeTaskToPendingController } from './change-task-to-pending-controller'
import { RequestValidator } from '@/validation/validations'
import { ChangeTaskToPendingUseCaseSpy } from '@/domain/todo-list'
import { mockChangeTaskToPendingRequest } from '@/presentation/todo-list/mocks'
import { conflict, forbidden, ok, serverError, unprocessableEntity, unauthorized } from '@/presentation/common/protocols'
import { AccessDeniedError, EntityIsNotFoundError, InvalidCredentialsError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: ChangeTaskToPendingController
  validator: RequestValidator
  changeTaskToPendingUseCase: ChangeTaskToPendingUseCaseSpy
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const changeTaskToPendingUseCase = new ChangeTaskToPendingUseCaseSpy()
  const sut = new ChangeTaskToPendingController(validator, changeTaskToPendingUseCase)
  return {
    sut,
    validator,
    changeTaskToPendingUseCase
  }
}

describe('ChangeTaskToPendingController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockChangeTaskToPendingRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(Object(request.body))
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockChangeTaskToPendingRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call ChangeTaskToPendingUseCase with correct value', async () => {
    const { sut, changeTaskToPendingUseCase } = makeSut()
    const request = mockChangeTaskToPendingRequest()
    const UpdateSpy = jest.spyOn(changeTaskToPendingUseCase, 'pending')
    await sut.handle(request)
    expect(UpdateSpy).toHaveBeenCalledWith({
      id: request.params.id,
      password: request.body.password
    })
  })

  test('Should return conflict if ChangeTaskToPendingUseCase return EntityIsNotFoundError', async () => {
    const { sut, changeTaskToPendingUseCase } = makeSut()
    const entityName = faker.database.column()
    jest.spyOn(changeTaskToPendingUseCase, 'pending').mockImplementationOnce(() => { throw new EntityIsNotFoundError(entityName) })
    const result = await sut.handle(mockChangeTaskToPendingRequest())
    expect(result).toEqual(conflict(new EntityIsNotFoundError(entityName)))
  })

  test('Should return unauthorized if ChangeTaskToPendingUseCase return InvalidCredentialsError', async () => {
    const { sut, changeTaskToPendingUseCase } = makeSut()
    jest.spyOn(changeTaskToPendingUseCase, 'pending').mockImplementationOnce(() => { throw new InvalidCredentialsError() })
    const result = await sut.handle(mockChangeTaskToPendingRequest())
    expect(result).toEqual(unauthorized(new InvalidCredentialsError()))
  })

  test('Should return forbidden if ChangeTaskToPendingUseCase return AccessDeniedError', async () => {
    const { sut, changeTaskToPendingUseCase } = makeSut()
    jest.spyOn(changeTaskToPendingUseCase, 'pending').mockImplementationOnce(() => { throw new AccessDeniedError() })
    const result = await sut.handle(mockChangeTaskToPendingRequest())
    expect(result).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return serverError if ChangeTaskToPendingUseCase return other error', async () => {
    const { sut, changeTaskToPendingUseCase } = makeSut()
    jest.spyOn(changeTaskToPendingUseCase, 'pending').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockChangeTaskToPendingRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return Updated if ChangeTaskToPendingUseCase is succeeds', async () => {
    const { sut, changeTaskToPendingUseCase } = makeSut()
    const result = await sut.handle(mockChangeTaskToPendingRequest())
    expect(result).toEqual(ok(changeTaskToPendingUseCase.task))
  })
})
