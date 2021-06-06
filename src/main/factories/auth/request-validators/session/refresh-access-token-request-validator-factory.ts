import { RequestValidator } from '@/validation/validations'

export const makeRefreshAccessTokenRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('sessionId').required()
  return validator
}
