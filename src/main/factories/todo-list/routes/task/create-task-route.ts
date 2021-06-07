import { routeAdapter } from '@/main/common/adapters/express'
import { CreateTaskControllerProps, makeCreateTaskController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type CreateTaskRouteProps = CreateTaskControllerProps

export const makeCreateTaskRoute = (props: CreateTaskControllerProps): Router => {
  return Router()
    .post('/',
      routeAdapter(makeCreateTaskController(props)))
}
