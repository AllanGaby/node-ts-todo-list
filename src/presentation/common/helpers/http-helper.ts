import { HttpResponse, HttpStatusCode } from '@/presentation/common/protocols'

export const ok = <BodyType>(data: BodyType): HttpResponse<BodyType> => ({
  statusCode: HttpStatusCode.ok,
  body: data
})

export const created = <BodyType>(data: BodyType): HttpResponse<BodyType> => ({
  statusCode: HttpStatusCode.created,
  body: data
})

export const noContent = (): HttpResponse<any> => ({
  statusCode: HttpStatusCode.noContent,
  body: undefined
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  body: error,
  statusCode: HttpStatusCode.badRequest
})

export const unauthorized = (error: Error): HttpResponse<Error> => ({
  body: error,
  statusCode: HttpStatusCode.unauthorized
})

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.forbidden,
  body: error
})

export const unprocessableEntity = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.unprocessableEntity,
  body: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.serverError,
  body: error
})
