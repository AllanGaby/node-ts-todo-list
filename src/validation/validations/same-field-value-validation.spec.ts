import { SameFieldValueValidation } from './same-field-value-validation'
import { mockDifferentFieldValue, mockSameFieldValue } from '@/validation/mocks'
import { DifferentFieldValueError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: SameFieldValueValidation
  field: string
  compareField: string
}

const makeSut = (): sutTypes => {
  const field = faker.random.uuid()
  const compareField = faker.random.uuid()
  const sut = new SameFieldValueValidation(field, compareField)
  return {
    sut,
    field,
    compareField
  }
}

describe('SameFieldValueValidation', () => {
  test('Should return undefined if field value is iqual to compareField value', () => {
    const { sut, field, compareField } = makeSut()
    const validations = sut.validate(mockSameFieldValue([field, compareField]))
    expect(validations).toBeFalsy()
  })

  test('Should return undefined if field value and compareField value is undefined', () => {
    const { sut } = makeSut()
    const validations = sut.validate({})
    expect(validations).toBeFalsy()
  })

  test('Should return DifferentFieldValueError if field value is different to compareField value', () => {
    const { sut, field, compareField } = makeSut()
    const validations = sut.validate(mockDifferentFieldValue([field, compareField]))
    expect(validations).toEqual(new DifferentFieldValueError(field, compareField))
  })
})
