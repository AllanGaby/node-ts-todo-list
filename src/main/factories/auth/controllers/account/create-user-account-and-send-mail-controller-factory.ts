import { CreateUserAccountAndSendMailController } from '@/presentation/auth/controllers'
import { makeCreateUserAccountAndSendMailUseCase, CreateUserAccountAndSendMailUseCaseProps } from '../../use-cases'
import { makeCreateUserAccountAndSendMailRequestValidator } from '@/main/factories/auth/request-validators'

export type CreateUserAccountAndSendMailControllerProps = CreateUserAccountAndSendMailUseCaseProps

export const makeCreateUserAccountAndSendMailController = (props: CreateUserAccountAndSendMailControllerProps): CreateUserAccountAndSendMailController => {
  return new CreateUserAccountAndSendMailController(
    makeCreateUserAccountAndSendMailRequestValidator(),
    makeCreateUserAccountAndSendMailUseCase(props))
}
