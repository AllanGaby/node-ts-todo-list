import { Validation } from '@/validation/protocols'
import { ValidationError, DifferentFieldValueError } from '@/validation/errors'

export class SameFieldValueValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly compareField: string
  ) {}

  validate (data: object): ValidationError {
    if (data[this.field] !== data[this.compareField]) {
      return new DifferentFieldValueError(this.field, this.compareField)
    }
    return undefined
  }
}
