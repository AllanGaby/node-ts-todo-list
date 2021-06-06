export interface DecryptRequestWithPrivateKey {
  decrypt: (token: string) => string
}
