import { ActiveUserAccountController } from '@/presentation/auth/controllers'
import { makeActiveUserAccountRequestValidator } from '@/main/factories/auth/request-validators'
import { makeActiveUserAccountUseCase } from '@/main/factories/auth/use-cases'
import { RepositoryType } from '@/infrastructure/common/repositories'

export type ActiveUserAccountControllerProps = {
  repositoryType: RepositoryType
}

export const makeActiveUserAccountController = ({ repositoryType }: ActiveUserAccountControllerProps): ActiveUserAccountController => {
  return new ActiveUserAccountController(
    makeActiveUserAccountRequestValidator(),
    makeActiveUserAccountUseCase(repositoryType)
  )
}
