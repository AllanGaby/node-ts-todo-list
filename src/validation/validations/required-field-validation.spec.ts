import { RequiredFieldValidation } from './required-field-validation'
import { mockFieldUndefined, mockFieldValue, mockConditionalValidationWithTrueResult, mockConditionalValidationWithFalseResult } from '@/validation/mocks'
import { FieldValueRequiredError } from '@/validation/errors'
import faker from 'faker'

type sutTypes = {
  sut: RequiredFieldValidation
  field: string
}

const makeSut = (conditionalValidation?: (data: object) => boolean): sutTypes => {
  const field = faker.random.uuid()
  const sut = new RequiredFieldValidation(field, conditionalValidation)
  return {
    sut,
    field
  }
}

describe('RequiredFieldValidation', () => {
  describe('Without conditional validation', () => {
    test('Should return undefined if field value is provide', () => {
      const { sut, field } = makeSut()
      const validations = sut.validate(mockFieldValue(field))
      expect(validations).toBeFalsy()
    })

    test('Should return FieldValueRequiredError if field value is undefined', () => {
      const { sut, field } = makeSut()
      const validations = sut.validate(mockFieldUndefined(field))
      expect(validations).toEqual(new FieldValueRequiredError(field))
    })
  })

  describe('With conditional with result true', () => {
    test('Should return undefined if field value is provide', () => {
      const { sut, field } = makeSut(mockConditionalValidationWithTrueResult)
      const validations = sut.validate(mockFieldValue(field))
      expect(validations).toBeFalsy()
    })

    test('Should return FieldValueRequiredError if field value is undefined', () => {
      const { sut, field } = makeSut(mockConditionalValidationWithTrueResult)
      const validations = sut.validate(mockFieldUndefined(field))
      expect(validations).toEqual(new FieldValueRequiredError(field))
    })
  })

  describe('With conditional with result false', () => {
    test('Should return undefined if field value is provide', () => {
      const { sut, field } = makeSut(mockConditionalValidationWithFalseResult)
      const validations = sut.validate(mockFieldValue(field))
      expect(validations).toBeFalsy()
    })

    test('Should return undefined if field value is undefined', () => {
      const { sut, field } = makeSut(mockConditionalValidationWithFalseResult)
      const validations = sut.validate(mockFieldUndefined(field))
      expect(validations).toBeFalsy()
    })
  })
})
