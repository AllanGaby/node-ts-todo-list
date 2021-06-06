import { RequestValidator } from '@/validation/validations'

export const makeShowAuthenticatedUserAccountRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('accountId').required()
  return validator
}
