import { ExportToSheetFileDTO } from './'

export interface ExportToCSV {
  exportToCSV: <random = object>(params: ExportToSheetFileDTO<random>) => Promise<void>
}
