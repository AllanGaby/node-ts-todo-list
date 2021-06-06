export class ValidationError {
  public readonly field: string
  public readonly message: string

  constructor (
    field: string,
    message: string) {
    this.field = field
    this.message = message
  }
}
