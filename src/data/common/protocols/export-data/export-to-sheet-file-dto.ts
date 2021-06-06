import { ColumnToExportData } from './column-to-export-data'

export type ExportToSheetFileDTO<random = object> = {
  data: random[]
  filePath: string
  columns?: ColumnToExportData[]
}
