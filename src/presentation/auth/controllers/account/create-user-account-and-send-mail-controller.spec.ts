import { CreateUserAccountAndSendMailController } from './create-user-account-and-send-mail-controller'
import { RequestValidator } from '@/validation/validations'
import { CreateUserAccountAndSendMailUseCaseSpy } from '@/domain/auth'
import { mockCreateUserAccountAndSendMailRequest } from '@/presentation/auth/mocks'
import { conflict, noContent, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EmailInUseError } from '@/data/auth/errors'

type sutTypes = {
  sut: CreateUserAccountAndSendMailController
  validator: RequestValidator
  createUserAccountAndSendMailUseCase: CreateUserAccountAndSendMailUseCaseSpy
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const createUserAccountAndSendMailUseCase = new CreateUserAccountAndSendMailUseCaseSpy()
  const sut = new CreateUserAccountAndSendMailController(validator, createUserAccountAndSendMailUseCase)
  return {
    sut,
    validator,
    createUserAccountAndSendMailUseCase
  }
}

describe('CreateUserAccountAndSendMailController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockCreateUserAccountAndSendMailRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockCreateUserAccountAndSendMailRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call CreateUserAccountAndSendMailUseCase with correct value', async () => {
    const { sut, createUserAccountAndSendMailUseCase } = makeSut()
    const request = mockCreateUserAccountAndSendMailRequest()
    const createSpy = jest.spyOn(createUserAccountAndSendMailUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    })
  })

  test('Should return conflict if CreateUserAccountAndSendMailUseCase return EmailIsInUseError', async () => {
    const { sut, createUserAccountAndSendMailUseCase } = makeSut()
    jest.spyOn(createUserAccountAndSendMailUseCase, 'create').mockImplementationOnce(() => { throw new EmailInUseError() })
    const result = await sut.handle(mockCreateUserAccountAndSendMailRequest())
    expect(result).toEqual(conflict(new EmailInUseError()))
  })

  test('Should return serverError if CreateUserAccountAndSendMailUseCase return other error', async () => {
    const { sut, createUserAccountAndSendMailUseCase } = makeSut()
    jest.spyOn(createUserAccountAndSendMailUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockCreateUserAccountAndSendMailRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return noContent if CreateUserAccountAndSendMailUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockCreateUserAccountAndSendMailRequest())
    expect(result).toEqual(noContent())
  })
})
