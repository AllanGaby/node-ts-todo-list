import { Express } from 'express'
import { Config } from '@/main/config/environment'
import { makeTasksGenericRoute } from '@/main/factories/todo-list/routes'

export default (app: Express): void => {
  app.use('/api', makeTasksGenericRoute({
    repositoryType: Config.repositoryType
  }))
}
