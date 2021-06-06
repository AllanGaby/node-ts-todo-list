import { Validation } from '@/validation/protocols'
import { ValidationError, MinFieldValueError, MaxFieldValueError } from '@/validation/errors'

export type RangeOptions = {
  min?: number
  max?: number
}

export class FieldValueRangeValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly options: RangeOptions
  ) {}

  validate (data: object): ValidationError {
    if ((data[this.field]) && ((this.options.min) || (this.options.max))) {
      const value = data[this.field] as number
      if ((this.options.min) && (value < this.options.min)) {
        return new MinFieldValueError(this.field)
      }
      if ((this.options.max) && (value > this.options.max)) {
        return new MaxFieldValueError(this.field)
      }
    }
    return undefined
  }
}
