import { RequestValidator } from '@/validation/validations'

export const makeRecoverPasswordRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('token').required()
  validator.field('password').required().length({ min: 6, max: 20 })
  validator.field('password_confirmation').required().sameAs('password')
  return validator
}
