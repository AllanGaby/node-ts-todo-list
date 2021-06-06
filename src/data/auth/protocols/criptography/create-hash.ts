export interface CreateHash {
  hash: (payload: string) => Promise<string>
}
