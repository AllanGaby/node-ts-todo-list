import { AccountType } from '@/domain/auth'
import faker from 'faker'

export const mockAccountType = (): AccountType => {
  return faker.random.arrayElement([AccountType.manager, AccountType.standard])
}
