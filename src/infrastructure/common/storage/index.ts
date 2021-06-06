import { UploadStorageFile, DeleteStorageFile } from '@/data/common/protocols'
import { LocalStorageAdapter, LocalStorageConfig } from './local-storage-adapter'

export type StorageConfig = LocalStorageConfig

export class StorageFactory {
  static makeUploadStorageFile = (config: StorageConfig): UploadStorageFile => new LocalStorageAdapter(config)
  static makeDeleteStorageFile = (config: StorageConfig): DeleteStorageFile => new LocalStorageAdapter(config)
}
