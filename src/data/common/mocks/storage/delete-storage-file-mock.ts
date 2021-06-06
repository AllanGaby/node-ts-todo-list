import { DeleteStorageFile, DeleteStorageFileDTO } from '@/data/common/protocols'

export class DeleteStorageFileSpy implements DeleteStorageFile {
  params: DeleteStorageFileDTO

  async delete (params: DeleteStorageFileDTO): Promise<void> {
    this.params = params
  }
}
