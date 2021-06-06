import { Validation } from '@/validation/protocols'
import { ValidationError, FieldValueRequiredError } from '@/validation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly conditionalValidation?: (data: object) => boolean
  ) {}

  validate (data: object): ValidationError {
    if (((!this.conditionalValidation) || (this.conditionalValidation(data))) && (!data[this.field])) {
      return new FieldValueRequiredError(this.field)
    }
    return undefined
  }
}
