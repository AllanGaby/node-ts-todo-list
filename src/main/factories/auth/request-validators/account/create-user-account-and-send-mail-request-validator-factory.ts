import { RequestValidator } from '@/validation/validations'

export const makeCreateUserAccountAndSendMailRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('name').required().length({ min: 3, max: 100 })
  validator.field('email').required().email()
  validator.field('password').required().length({ min: 6, max: 20 })
  validator.field('password_confirmation').required().sameAs('password')
  return validator
}
