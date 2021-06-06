import { RangeOptions } from '@/validation/validations'
import faker from 'faker'

export const mockFieldUndefined = (field: string): object => ({
  [field]: undefined
})

export const mockFieldValue = (field: string, lenght: number = 10): object => ({
  [field]: faker.random.alphaNumeric(lenght)
})

export const addFieldValue = (record: object, field: string, value: any = faker.random.uuid()): object => ({
  ...record,
  [field]: value
})

export const mockSameFieldValue = (fields: string []): object => {
  const record = {}
  const value = faker.random.uuid()
  fields.forEach((field) => { record[field] = value })
  return record
}

export const mockDifferentFieldValue = (fields: string []): object => {
  const record = {}
  fields.forEach((field) => { record[field] = faker.random.uuid() })
  return record
}

export const mockConditionalValidationWithFalseResult = (data: object): boolean => {
  return false
}

export const mockConditionalValidationWithTrueResult = (data: object): boolean => {
  return true
}

export const mockRangeOptions = (): RangeOptions => ({
  min: -10,
  max: 10
})

export const mockRangeValue = (field: string, { min, max }: RangeOptions): object => ({
  [field]: faker.random.number({ min, max })
})
