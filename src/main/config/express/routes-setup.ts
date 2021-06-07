import { Express } from 'express'
import { Config } from '@/main/config/environment'
import { makeTodoRoute } from '@/main/factories/todo-list/routes'

export default (app: Express): void => {
  app.use('/api', makeTodoRoute({
    repositoryType: Config.repositoryType
  }))
}
