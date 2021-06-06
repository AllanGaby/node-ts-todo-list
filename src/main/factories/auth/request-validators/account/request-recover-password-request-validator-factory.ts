import { RequestValidator } from '@/validation/validations'

export const makeRequestRecoverPasswordRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('email').required().email()
  return validator
}
