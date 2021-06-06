import { Validation } from '@/validation/protocols'
import { ValidationError, InvalidFieldValueError } from '@/validation/errors'

export class RegexFieldValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly regex: RegExp
  ) {}

  validate (data: object): ValidationError {
    const value = data[this.field] as string
    if ((value) && (!this.regex.test(value))) {
      return new InvalidFieldValueError(this.field)
    }
    return undefined
  }
}
