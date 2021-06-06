import { Validation } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'

export class ValidationSpy implements Validation {
  data: object
  error: ValidationError = undefined

  validate (data: object): ValidationError {
    this.data = data
    return this.error
  }
}
