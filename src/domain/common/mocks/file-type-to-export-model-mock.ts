import { FileTypeToExportModel } from '@/domain/common'
import faker from 'faker'

export const mockFileTypeToExportModel = (): FileTypeToExportModel => {
  return faker.random.arrayElement([
    FileTypeToExportModel.CSV,
    FileTypeToExportModel.PDF,
    FileTypeToExportModel.XLSX
  ])
}
