import { badRequest, serverError, unauthorized, forbidden, noContent, unprocessableEntity, conflict, notFound } from './components/http'
import { accessToken } from './components/auth'

export default {
  securitySchemes: {
    accessToken
  },
  badRequest,
  conflict,
  forbidden,
  noContent,
  notFound,
  serverError,
  unauthorized,
  unprocessableEntity
}
