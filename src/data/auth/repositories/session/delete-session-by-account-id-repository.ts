export interface DeleteSessionByAccountIdRepository {
  deleteByAccountId: (accountId: string) => Promise<void>
}
