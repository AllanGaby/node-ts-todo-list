import path from 'path'
import dotenv from 'dotenv'
import { RepositoryType } from '@/infrastructure/common/repositories'
import { CacheProps, CacheType } from '@/infrastructure/common/cache'
import { ContactModel } from '@/domain/comunication'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '..', '.env')
})

type User = {
  name: string
  email: string
  password: string
}

type ConfigDTO = {
  port: number
  repositoryType: RepositoryType
  cache: CacheProps
  tempDir: string
  uploadDir: string
  host: string
  comunication: {
    sender: ContactModel
    sendMailQueueName: string
  }
  criptography: {
    privateKey: string
    publicKey: string
    accessTokenValidityInMinutes: number
    refreshTokenValidityInMinutes: number
    salt: number
  }
  auth: {
    accessTokenName: string
    activeAccountEndPoint: string
    manager: User
    recoverPasswordTokenValidityInMinutes: number
  }
  messageQueue: {
    host: string
  }
}

export const Config: ConfigDTO = {
  port: Number(process.env.API_PORT),
  host: process.env.API_HOST,
  tempDir: path.resolve(__dirname, '..', '..', '..', '..', 'temp'),
  uploadDir: path.resolve(__dirname, '..', '..', '..', '..', 'uploads'),
  repositoryType: process.env.ENVIRONMENT === 'Test' ? RepositoryType.Memory : RepositoryType.TypeOrm,
  cache: {
    type: process.env.ENVIRONMENT === 'Test' ? CacheType.Memory : process.env.CACHE_TYPE as CacheType,
    host: process.env.CACHE_HOST,
    port: Number(process.env.CACHE_PORT),
    password: process.env.CACHE_PASSWORD
  },
  comunication: {
    sendMailQueueName: process.env.COMUNICATION_SEND_MAIL_QUEUE,
    sender: {
      name: process.env.COMUNICATION_SENDER_NAME,
      email: process.env.COMUNICATION_SENDER_EMAIL
    }
  },
  criptography: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
    accessTokenValidityInMinutes: Number(process.env.SECURITY_ACCESS_TOKEN_VALIDITY),
    refreshTokenValidityInMinutes: Number(process.env.SECURITY_REFRESH_TOKEN_VALIDITY),
    salt: Number(process.env.SECURITY_SALT)
  },
  auth: {
    accessTokenName: process.env.AUTH_ACCESS_TOKEN_NAME,
    activeAccountEndPoint: process.env.AUTH_ACTIVE_ACCOUNT_END_POINT,
    recoverPasswordTokenValidityInMinutes: Number(process.env.AUTH_RECOVER_PASSWORD_TOKEN_VALIDITY),
    manager: {
      name: process.env.AUTH_MANAGER_NAME,
      email: process.env.AUTH_MANAGER_EMAIL,
      password: process.env.AUTH_MANAGER_PASSWORD
    }
  },
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST
  }
}
