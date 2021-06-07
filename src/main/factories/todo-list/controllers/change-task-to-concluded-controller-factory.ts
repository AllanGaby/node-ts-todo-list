import { ChangeTaskToConcludedController } from '@/presentation/todo-list/controllers'
import { ChangeTaskToConcludedUseCaseProps, makeChangeTaskToConcludedUseCase } from '@/main/factories/todo-list/use-cases'
import { makeDefaultIdParamRequestValidator } from '@/main/factories/common/request-validator'

export type ChangeTaskToConcludedControllerProps = ChangeTaskToConcludedUseCaseProps

export const makeChangeTaskToConcludedController = (props: ChangeTaskToConcludedControllerProps): ChangeTaskToConcludedController => {
  return new ChangeTaskToConcludedController(
    makeDefaultIdParamRequestValidator(),
    makeChangeTaskToConcludedUseCase(props)
  )
}
