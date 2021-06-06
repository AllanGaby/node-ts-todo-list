import { RequestValidator } from '@/validation/validations'

export const makeLoginRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('email').required().email()
  validator.field('password').required()
  return validator
}
