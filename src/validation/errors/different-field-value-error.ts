import { ValidationError } from './validation-error'

export class DifferentFieldValueError extends ValidationError {
  constructor (fieldName: string, compareFieldName: string) {
    super(fieldName, `value is different to ${compareFieldName}`)
  }
}
