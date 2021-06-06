import { ExportHtmlToPDFDTO } from '@/data/common/protocols'
import faker from 'faker'

export const mockExportHtmlToPDFDTO = (): ExportHtmlToPDFDTO => ({
  htmlContent: faker.random.words(),
  pdfFilePath: faker.system.filePath()
})
