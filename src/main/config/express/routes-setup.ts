import { Express } from 'express'
import { makeAuthRoutes } from '@/main/factories/auth/setup'
import { Config } from '@/main/config/environment'
import { AccountType } from '@/domain/auth'

export default (app: Express): void => {
  app.use('/api', makeAuthRoutes({
    activeAccountEndPoint: Config.auth.activeAccountEndPoint,
    messageQueueHost: Config.messageQueue.host,
    privateKey: Config.criptography.privateKey,
    sendMailQueueName: Config.comunication.sendMailQueueName,
    welcomeMailFilePath: 'public/views/handlebars/create-account-mail.hbs',
    repositoryType: Config.repositoryType,
    salt: Config.criptography.salt,
    senderMail: Config.comunication.sender,
    accessTokenValidityInMinutes: Config.criptography.accessTokenValidityInMinutes,
    refreshTokenValidityInMinutes: Config.criptography.refreshTokenValidityInMinutes,
    accountType: AccountType.standard,
    accessTokenName: Config.auth.accessTokenName,
    cacheProps: Config.cache,
    recoverPasswordMailFilePath: 'public/views/handlebars/request-recover-password-mail.hbs',
    recoverPasswordTokenValidityInMinutes: Config.auth.recoverPasswordTokenValidityInMinutes,
    changeEMailMailPath: 'public/views/handlebars/request-recover-password-mail.hbs',
    storageConfig: {
      temporaryDir: Config.tempDir,
      uploadDir: Config.uploadDir
    }
  }))
}
