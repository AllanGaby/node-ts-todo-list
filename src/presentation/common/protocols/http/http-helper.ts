import { HttpResponse, HttpStatusCode } from '@/presentation/common/protocols'

export const ok = <BodyType>(data: BodyType): HttpResponse<BodyType> => ({
  statusCode: HttpStatusCode.ok,
  body: data
})

export const exportFile = (filePath: string): HttpResponse<any> => ({
  statusCode: HttpStatusCode.ok,
  body: undefined,
  filePath
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

export const notFound = (): HttpResponse<any> => ({
  statusCode: HttpStatusCode.notFound,
  body: undefined
})

export const conflict = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.conflict,
  body: error
})

export const unprocessableEntity = (error: object): HttpResponse<object> => ({
  statusCode: HttpStatusCode.unprocessableEntity,
  body: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.serverError,
  body: error
})
