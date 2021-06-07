import { RequestValidator } from '@/validation/validations'

export const makeUpdateTaskRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('title').required()
  validator.field('description').required()
  validator.field('email').required()
  return validator
}
