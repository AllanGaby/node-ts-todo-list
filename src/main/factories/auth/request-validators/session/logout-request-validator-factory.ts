import { RequestValidator } from '@/validation/validations'

export const makeLogoutRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('sessionId').required()
  return validator
}
