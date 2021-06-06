import { ValidationError } from './validation-error'

export class FieldValueRequiredError extends ValidationError {
  constructor (fieldName: string) {
    super(fieldName, 'value is required')
  }
}
