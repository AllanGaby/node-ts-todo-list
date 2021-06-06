import { RequestValidator } from '@/validation/validations'

export const makeEncryptedRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('token').required()
  return validator
}
