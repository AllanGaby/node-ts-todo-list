import { AuthenticatedRequestMiddleware } from './authenticated-request-middleware'
import { AccountType, mockAccessTokenPayloadModel, mockAccountType, RecoverAccessTokenPayloadUseCaseSpy, ValidateSessionByIdUseCaseSpy } from '@/domain/auth'
import { mockAuthenticatedMiddlewareRequest } from '@/presentation/auth/mocks'
import { unprocessableEntity, ok, unauthorized } from '@/presentation/common/protocols'
import { AccessDeniedError } from '@/presentation/auth/errors'
import { RequestValidator } from '@/validation/validations'
import { InvalidCredentialsError, SessionNotFoundError } from '@/data/auth/errors'
import faker from 'faker'

type sutTypes = {
  sut: AuthenticatedRequestMiddleware
  requestValidator: RequestValidator
  recoverAccessTokenPayloadUseCase: RecoverAccessTokenPayloadUseCaseSpy
  validateSessionByIdUseCase: ValidateSessionByIdUseCaseSpy
  accessTokenName: string
}

const makeSut = (accountTypesWithAccess: AccountType[] = []): sutTypes => {
  const recoverAccessTokenPayloadUseCase = new RecoverAccessTokenPayloadUseCaseSpy()
  const requestValidator = new RequestValidator()
  const validateSessionByIdUseCase = new ValidateSessionByIdUseCaseSpy()
  const accessTokenName = faker.database.column()
  const sut = new AuthenticatedRequestMiddleware(
    requestValidator,
    recoverAccessTokenPayloadUseCase,
    validateSessionByIdUseCase,
    accountTypesWithAccess,
    accessTokenName)
  return {
    sut,
    requestValidator,
    recoverAccessTokenPayloadUseCase,
    validateSessionByIdUseCase,
    accessTokenName
  }
}

describe('AuthenticatedRequestMiddleware', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator, accessTokenName } = makeSut()
    const request = mockAuthenticatedMiddlewareRequest(accessTokenName)
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.headers)
  })

  test('Should return unauthorized if RequestValidator fails', async () => {
    const { sut, requestValidator, accessTokenName } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should call RecoverAccessTokenPayloadUseCase with correct value', async () => {
    const { sut, recoverAccessTokenPayloadUseCase, accessTokenName } = makeSut()
    const request = mockAuthenticatedMiddlewareRequest(accessTokenName)
    await sut.handle(request)
    expect(recoverAccessTokenPayloadUseCase.token).toEqual(request.headers[accessTokenName])
  })

  test('Should return Unprocessable Entity status code if RecoverAccessTokenPayloadUseCase return an exception', async () => {
    const { sut, recoverAccessTokenPayloadUseCase, accessTokenName } = makeSut()
    jest.spyOn(recoverAccessTokenPayloadUseCase, 'recover').mockImplementationOnce(() => { throw new InvalidCredentialsError() })
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(response).toEqual(unprocessableEntity(new InvalidCredentialsError()))
  })

  test('Should return unauthorized status code if RecoverAccessTokenPayloadUseCase return an account without access', async () => {
    const accountTypeToValidation = mockAccountType()
    const { sut, recoverAccessTokenPayloadUseCase, accessTokenName } = makeSut([accountTypeToValidation])
    const accessToken = mockAccessTokenPayloadModel(accessTokenName)
    while (accountTypeToValidation === accessToken.accountType) {
      accessToken.accountType = mockAccountType()
    }
    jest.spyOn(recoverAccessTokenPayloadUseCase, 'recover').mockResolvedValue(accessToken)
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should call ValidateSessionByIdUseCase with correct value', async () => {
    const { sut, recoverAccessTokenPayloadUseCase, accessTokenName, validateSessionByIdUseCase } = makeSut()
    await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(validateSessionByIdUseCase.sessionId).toBe(recoverAccessTokenPayloadUseCase.accessTokenPayload.sessionId)
  })

  test('Should return unauthorized status code if ValidateSessionByIdUseCase return undefined', async () => {
    const { sut, accessTokenName, validateSessionByIdUseCase } = makeSut()
    validateSessionByIdUseCase.session = undefined
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return unauthorized status code if ValidateSessionByIdUseCase return SessionNotFoundError', async () => {
    const { sut, accessTokenName, validateSessionByIdUseCase } = makeSut()
    jest.spyOn(validateSessionByIdUseCase, 'validate').mockImplementationOnce(() => { throw new SessionNotFoundError() })
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return Ok status code if ValidateSessionByIdUseCase is succeeds and return an account with access', async () => {
    const accountTypeToValidation = mockAccountType()
    const { sut, recoverAccessTokenPayloadUseCase, accessTokenName } = makeSut([accountTypeToValidation])
    const accessToken = mockAccessTokenPayloadModel()
    while (accountTypeToValidation !== accessToken.accountType) {
      accessToken.accountType = mockAccountType()
    }
    jest.spyOn(recoverAccessTokenPayloadUseCase, 'recover').mockResolvedValue(accessToken)
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest(accessTokenName))
    expect(response).toEqual(ok<object>({
      access_token: accessToken
    }))
  })
})
