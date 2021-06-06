import { UploadStorageFile, UploadStorageFileDTO } from '@/data/common/protocols'

export class UploadStorageFileSpy implements UploadStorageFile {
  uploadParams: UploadStorageFileDTO
  isUploaded: boolean = false

  async upload (params: UploadStorageFileDTO): Promise<boolean> {
    this.uploadParams = params
    return this.isUploaded
  }
}
