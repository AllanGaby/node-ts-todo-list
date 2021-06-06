import { Validation } from '@/validation/protocols'
import { ValidationError } from '@/validation/errors'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: Validation[]
  ) {}

  validate (data: object): ValidationError {
    for (const validation of this.validations) {
      const error = validation.validate(data)
      if (error) {
        return error
      }
    }
    return undefined
  }
}
