import { RequestValidator } from '@/validation/validations'
import { UpdateUserAccountRequest } from '@/presentation/auth/requests'

export const makeUpdateUserAccountRequestValidator = (): RequestValidator => {
  const passwordIsDefined = (data: UpdateUserAccountRequest): boolean => {
    return (Boolean(data.old_password) || Boolean(data.new_password) || Boolean(data.new_password_confirmation))
  }

  const validator = new RequestValidator()
  validator.field('name').required().length({ min: 3, max: 100 })
  validator.field('email').email()
  validator.field('old_password').required(passwordIsDefined).length({ min: 6, max: 20 })
  validator.field('new_password').required(passwordIsDefined).length({ min: 6, max: 20 })
  validator.field('new_password_confirmation').required(passwordIsDefined).sameAs('new_password')
  return validator
}
