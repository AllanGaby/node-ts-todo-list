export const encryptedRequestSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      description: 'Token criptografado usando a chave pública da aplicação.'
    }
  },
  required: [
    'token'
  ]
}
