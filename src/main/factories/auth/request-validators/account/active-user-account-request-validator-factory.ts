import { RequestValidator } from '@/validation/validations'

export const makeActiveUserAccountRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('account_id').required()
  return validator
}
