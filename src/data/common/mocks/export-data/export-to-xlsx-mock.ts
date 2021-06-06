import { ExportToXLSX, ExportToSheetFileDTO } from '@/data/common/protocols'

export class ExportToXLSXSpy implements ExportToXLSX {
  params: ExportToSheetFileDTO<any>

  async exportToXLSX <random = object>(params: ExportToSheetFileDTO<random>): Promise<void> {
    this.params = params
  }
}
