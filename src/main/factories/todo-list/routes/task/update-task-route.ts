import { routeAdapter } from '@/main/common/adapters/express'
import { UpdateTaskControllerProps, makeUpdateTaskController } from '@/main/factories/todo-list/controllers'
import { Router } from 'express'

export type UpdateTaskRouteProps = UpdateTaskControllerProps

export const makeUpdateTaskRoute = (props: UpdateTaskRouteProps): Router => {
  return Router()
    .put('/:id',
      routeAdapter(makeUpdateTaskController(props)))
}
