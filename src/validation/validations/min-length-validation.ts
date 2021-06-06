import { Validation } from '@/validation/protocols'
import { ValidationError, MinLengthFieldError } from '@/validation/errors'

export class MinLengthValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly minLength: number
  ) {}

  validate (data: object): ValidationError {
    const value = data[this.field] as string
    if ((value) && (value.length < this.minLength)) {
      return new MinLengthFieldError(this.field)
    }
    return undefined
  }
}
