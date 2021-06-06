import { ValidationBuilder, ValidationComposite } from './'

export class RequestValidator {
  private readonly fields: ValidationBuilder[]

  constructor () {
    this.fields = []
  }

  field (field: string): ValidationBuilder {
    const validation = ValidationBuilder.field(field)
    this.fields.push(validation)
    return validation
  }

  validate (data: object): object {
    const result = {}
    for (const field of this.fields) {
      const composite = new ValidationComposite(field.build())
      const error = composite.validate(data)
      if (error) {
        result[error.field] = error.message
      }
    }
    if (Object.keys(result).length === 0) {
      return undefined
    }
    return result
  }
}
