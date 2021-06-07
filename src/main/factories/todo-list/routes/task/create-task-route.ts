import { routeAdapter } from '@/main/common/adapters/express'
import { CreateEntityControllerProps, makeCreateEntityController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type CreateTaskRouteProps = CreateEntityControllerProps

export const makeCreateTaskRoute = (props: CreateEntityControllerProps): Router => {
  return Router()
    .post('/',
      routeAdapter(makeCreateEntityController(props)))
}
