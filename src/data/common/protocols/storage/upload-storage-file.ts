export interface UploadStorageFileDTO {
  sourceFile: string
  destinationFile: string
}

export interface UploadStorageFile {
  upload: (data: UploadStorageFileDTO) => Promise<boolean>
}
