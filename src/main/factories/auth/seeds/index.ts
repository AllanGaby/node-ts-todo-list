import { createUserAccountManagerSeeds, CreateUserAccountManagerSeedsProps } from './account'

export type AuthSeedProps = CreateUserAccountManagerSeedsProps

export const makeAuthSeed = async (props: AuthSeedProps): Promise<void> => {
  await createUserAccountManagerSeeds(props)
}
