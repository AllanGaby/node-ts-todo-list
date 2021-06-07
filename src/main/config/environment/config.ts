import path from 'path'
import dotenv from 'dotenv'
import { RepositoryType } from '@/infrastructure/common/repositories'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '..', '.env')
})

type ConfigDTO = {
  port: number
  repositoryType: RepositoryType
  host: string
}

export const Config: ConfigDTO = {
  port: Number(process.env.API_PORT),
  host: process.env.API_HOST,
  repositoryType: process.env.ENVIRONMENT === 'Test' ? RepositoryType.Memory : RepositoryType.TypeOrm
}
