import { ChangeTaskToPendingController } from '@/presentation/todo-list/controllers'
import { ChangeTaskToPendingUseCaseProps, makeChangeTaskToPendingUseCase } from '@/main/factories/todo-list/use-cases'
import { makeChangeTaskToPendingRequestValidator } from '@/main/factories/todo-list/request-validator'

export type ChangeTaskToPendingControllerProps = ChangeTaskToPendingUseCaseProps

export const makeChangeTaskToPendingController = (props: ChangeTaskToPendingControllerProps): ChangeTaskToPendingController => {
  return new ChangeTaskToPendingController(
    makeChangeTaskToPendingRequestValidator(),
    makeChangeTaskToPendingUseCase(props)
  )
}
