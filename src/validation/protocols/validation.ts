import { ValidationError } from '@/validation/errors'

export interface Validation {
  validate: (data: object) => ValidationError
}
