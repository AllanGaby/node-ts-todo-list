import { Validation } from '@/validation/protocols'
import { ValidationError, MaxLengthFieldError } from '@/validation/errors'

export class MaxLengthValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly minLength: number
  ) {}

  validate (data: object): ValidationError {
    const value = data[this.field] as string
    if ((value) && (value.length > this.minLength)) {
      return new MaxLengthFieldError(this.field)
    }
    return undefined
  }
}
