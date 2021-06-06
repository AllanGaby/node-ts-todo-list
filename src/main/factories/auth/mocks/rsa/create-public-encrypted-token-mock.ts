import crypto from 'crypto'

export const CreatePublicEncryptedToken = (publicKey: string, payload: object): string => {
  return crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(JSON.stringify(payload))).toString('base64')
}
