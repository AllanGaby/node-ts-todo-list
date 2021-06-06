import { RequestValidator } from '@/validation/validations'

export const makeUploadUserAccountAvatarRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('avatar_path').required()
  return validator
}
