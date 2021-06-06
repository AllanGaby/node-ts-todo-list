import { AccountType } from '@/domain/auth'
import { makeCreateUserAccountUseCase, CreateUserAccountUseCaseProps } from '@/main/factories/auth/use-cases'

export type CreateUserAccountManagerSeedsProps = CreateUserAccountUseCaseProps & {
  name: string
  email: string
  password: string
}

export const createUserAccountManagerSeeds = async (props: CreateUserAccountManagerSeedsProps): Promise<void> => {
  props.accountType = AccountType.manager
  const useCase = makeCreateUserAccountUseCase(props)
  try {
    await useCase.create({
      name: props.name,
      email: props.email,
      password: props.password
    })
  } catch (_) {
  }
}
