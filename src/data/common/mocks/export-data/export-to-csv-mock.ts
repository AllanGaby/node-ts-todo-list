import { ExportToCSV, ExportToSheetFileDTO } from '@/data/common/protocols'

export class ExportToCSVSpy implements ExportToCSV {
  params: ExportToSheetFileDTO<any>

  async exportToCSV <random = object>(params: ExportToSheetFileDTO<random>): Promise<void> {
    this.params = params
  }
}
