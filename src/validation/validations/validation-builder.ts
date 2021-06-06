import { Validation } from '@/validation/protocols'
import { RequiredFieldValidation, MinLengthValidation, MaxLengthValidation, SameFieldValueValidation, RegexFieldValidation, FieldValueRangeValidation } from './'

export const EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

type RangeOptions = {
  min?: number
  max?: number
}

export class ValidationBuilder {
  constructor (
    private readonly field: string,
    private readonly validations: Validation[]
  ) {}

  static field (field: string): ValidationBuilder {
    return new ValidationBuilder(field, [])
  }

  required (conditionalValidation?: (data: object) => boolean): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.field, conditionalValidation))
    return this
  }

  length ({ min, max }: RangeOptions): ValidationBuilder {
    if (min) {
      this.validations.push(new MinLengthValidation(this.field, min))
    }
    if (max) {
      this.validations.push(new MaxLengthValidation(this.field, max))
    }
    return this
  }

  range ({ min, max }: RangeOptions): ValidationBuilder {
    if ((Boolean(min)) && (Boolean(max))) {
      this.validations.push(new FieldValueRangeValidation(this.field, { min, max }))
    } else if (min) {
      this.validations.push(new FieldValueRangeValidation(this.field, { min }))
    } else if (max) {
      this.validations.push(new FieldValueRangeValidation(this.field, { max }))
    }
    return this
  }

  min (min: number): ValidationBuilder {
    this.validations.push(new FieldValueRangeValidation(this.field, { min }))
    return this
  }

  max (max: number): ValidationBuilder {
    this.validations.push(new FieldValueRangeValidation(this.field, { max }))
    return this
  }

  sameAs (compareField: string): ValidationBuilder {
    this.validations.push(new SameFieldValueValidation(this.field, compareField))
    return this
  }

  match (regex: RegExp): ValidationBuilder {
    this.validations.push(new RegexFieldValidation(this.field, regex))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new RegexFieldValidation(this.field, EmailRegex))
    return this
  }

  build (): Validation[] {
    return this.validations
  }
}
