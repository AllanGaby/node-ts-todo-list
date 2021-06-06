import { ExportToSheetFileDTO } from './'

export interface ExportToXLSX {
  exportToXLSX: <random = object>(params: ExportToSheetFileDTO<random>) => Promise<void>
}
