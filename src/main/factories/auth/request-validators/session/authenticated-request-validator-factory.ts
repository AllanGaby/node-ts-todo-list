import { RequestValidator } from '@/validation/validations'

export const makeAuthenticatedRequestValidator = (accessTokenName: string): RequestValidator => {
  const validator = new RequestValidator()
  validator.field(accessTokenName).required()
  return validator
}
