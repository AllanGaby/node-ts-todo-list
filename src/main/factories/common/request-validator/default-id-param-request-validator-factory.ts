import { RequestValidator } from '@/validation/validations'

export const makeDefaultIdParamRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('id').required()
  return validator
}
