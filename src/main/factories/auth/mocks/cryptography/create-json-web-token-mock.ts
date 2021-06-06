import { EncryptModel } from '@/data/auth/protocols'
import { CriptographyFactory } from '@/infrastructure/auth/criptography'

export const mockCreateJsonWebToken = async (privateKey: string, data: EncryptModel): Promise<string> => {
  return CriptographyFactory.makeEncryptWithSecret(privateKey).encrypt(data, '60m')
}
