import { RequestValidator } from '@/validation/validations'

export const makeChangeTaskToPendingRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('password').required()
  return validator
}
