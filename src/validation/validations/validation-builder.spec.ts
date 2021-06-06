import { ValidationBuilder as sut, ValidationBuilder, EmailRegex } from './validation-builder'
import { RequiredFieldValidation, MinLengthValidation, MaxLengthValidation, SameFieldValueValidation, RegexFieldValidation, FieldValueRangeValidation } from './'
import { mockConditionalValidationWithTrueResult } from '@/validation/mocks'
import faker from 'faker'

const field = faker.random.uuid()

describe('ValidationBuilder', () => {
  describe('Field Method', () => {
    test('Should return a ValidationBuilder without validations', () => {
      const result = sut.field(field)
      expect(result).toEqual(new ValidationBuilder(field, []))
    })
  })

  describe('Required Method', () => {
    test('Should return a ValidationBuilder with RequiredFieldValidation without conditional validation', () => {
      const result = sut.field(field).required()
      expect(result).toEqual(new ValidationBuilder(field, [
        new RequiredFieldValidation(field)
      ]))
    })

    test('Should return a ValidationBuilder with RequiredFieldValidation without conditional validation', () => {
      const result = sut.field(field).required(mockConditionalValidationWithTrueResult)
      expect(result).toEqual(new ValidationBuilder(field, [
        new RequiredFieldValidation(field, mockConditionalValidationWithTrueResult)
      ]))
    })
  })

  describe('Length Method', () => {
    test('Should return a ValidationBuilder with MinLengthValidation if min is provide', () => {
      const minLength = faker.random.number()
      const result = sut.field(field).length({ min: minLength })
      expect(result).toEqual(new ValidationBuilder(field, [
        new MinLengthValidation(field, minLength)
      ]))
    })

    test('Should return a ValidationBuilder with MinLengthValidation if max is provide', () => {
      const maxLength = faker.random.number()
      const result = sut.field(field).length({ max: maxLength })
      expect(result).toEqual(new ValidationBuilder(field, [
        new MaxLengthValidation(field, maxLength)
      ]))
    })

    test('Should return ValidationBuilder without validations if min and max is undefined', () => {
      const result = sut.field(field).length({ })
      expect(result).toEqual(new ValidationBuilder(field, []))
    })
  })

  describe('Range Method', () => {
    test('Should return a ValidationBuilder with FieldValueRangeValidation with min if min is provide', () => {
      const min = faker.random.number()
      const result = sut.field(field).range({ min })
      expect(result).toEqual(new ValidationBuilder(field, [
        new FieldValueRangeValidation(field, { min })
      ]))
    })

    test('Should return a ValidationBuilder with FieldValueRangeValidation with max if max is provide', () => {
      const max = faker.random.number()
      const result = sut.field(field).range({ max })
      expect(result).toEqual(new ValidationBuilder(field, [
        new FieldValueRangeValidation(field, { max })
      ]))
    })

    test('Should return ValidationBuilder with FieldValueRangeValidation with min and max if min and max is provide', () => {
      const max = faker.random.number()
      const min = faker.random.number()
      const result = sut.field(field).range({ min, max })
      expect(result).toEqual(new ValidationBuilder(field, [
        new FieldValueRangeValidation(field, { min, max })
      ]))
    })

    test('Should return ValidationBuilder without validations if min and max is undefined', () => {
      const result = sut.field(field).range({ })
      expect(result).toEqual(new ValidationBuilder(field, []))
    })
  })

  describe('Min Method', () => {
    test('Should return a ValidationBuilder with FieldValueRangeValidation with min value provide', () => {
      const min = faker.random.number()
      const result = sut.field(field).min(min)
      expect(result).toEqual(new ValidationBuilder(field, [
        new FieldValueRangeValidation(field, { min })
      ]))
    })
  })

  describe('Max Method', () => {
    test('Should return a ValidationBuilder with FieldValueRangeValidation with max value provide', () => {
      const max = faker.random.number()
      const result = sut.field(field).max(max)
      expect(result).toEqual(new ValidationBuilder(field, [
        new FieldValueRangeValidation(field, { max })
      ]))
    })
  })

  describe('SameAs Method', () => {
    test('Should return a ValidationBuilder with SameFieldValueValidation', () => {
      const compareField = faker.random.uuid()
      const result = sut.field(field).sameAs(compareField)
      expect(result).toEqual(new ValidationBuilder(field, [
        new SameFieldValueValidation(field, compareField)
      ]))
    })
  })

  describe('Match Method', () => {
    test('Should return a ValidationBuilder with RegexFieldValidation', () => {
      const regex = /\d/g
      const result = sut.field(field).match(regex)
      expect(result).toEqual(new ValidationBuilder(field, [
        new RegexFieldValidation(field, regex)
      ]))
    })
  })

  describe('Email Method', () => {
    test('Should return a ValidationBuilder with RegexFieldValidation with EmailRegex', () => {
      const result = sut.field(field).email()
      expect(result).toEqual(new ValidationBuilder(field, [
        new RegexFieldValidation(field, EmailRegex)
      ]))
    })
  })

  describe('Build Method', () => {
    test('Should return all validations', () => {
      const compareField = faker.random.uuid()
      const range = faker.random.number()
      const regex = /\d/g
      const result =
        sut.field(field)
          .required()
          .length({ min: range, max: range })
          .min(range)
          .max(range)
          .range({ min: range, max: range })
          .sameAs(compareField)
          .match(regex)
          .email()
          .build()
      expect(result).toEqual([
        new RequiredFieldValidation(field),
        new MaxLengthValidation(field, range),
        new MinLengthValidation(field, range),
        new FieldValueRangeValidation(field, { min: range }),
        new FieldValueRangeValidation(field, { max: range }),
        new FieldValueRangeValidation(field, { min: range, max: range }),
        new SameFieldValueValidation(field, compareField),
        new RegexFieldValidation(field, regex),
        new RegexFieldValidation(field, EmailRegex)
      ])
    })
  })
})
