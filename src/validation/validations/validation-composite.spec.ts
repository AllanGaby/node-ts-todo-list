import { ValidationComposite } from './validation-composite'
import { mockFieldValue, ValidationSpy } from '@/validation/mocks'
import { ValidationError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: ValidationComposite
  field: string
  validations: ValidationSpy[]
}

const makeSut = (): sutTypes => {
  const field = faker.random.uuid()
  const validations = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validations)
  return {
    sut,
    field,
    validations
  }
}

describe('ValidationComposite', () => {
  test('Should return undefined if all validations is succeeds', () => {
    const { sut, field } = makeSut()
    const result = sut.validate(mockFieldValue(field))
    expect(result).toBeFalsy()
  })

  test('Should return an Error if some validation fails', () => {
    const { sut, field, validations } = makeSut()
    validations[0].error = new ValidationError(field, faker.random.words())
    const result = sut.validate(mockFieldValue(field))
    expect(result).toEqual(validations[0].error)
  })

  test('Should return first error if all validation fails', () => {
    const { sut, field, validations } = makeSut()
    validations[0].error = new ValidationError(field, faker.random.words())
    validations[1].error = new ValidationError(field, faker.random.words())
    const result = sut.validate(mockFieldValue(field))
    expect(result).toEqual(validations[0].error)
  })
})
