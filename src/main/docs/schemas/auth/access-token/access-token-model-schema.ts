import { AccountType } from '@/domain/auth'

export const accessTokenModelSchema = {
  type: 'object',
  properties: {
    access_token: {
      type: 'string',
      description: 'Token de acesso da aplicação'
    },
    refresh_token: {
      type: 'string',
      description: 'Token de atualização do token de acesso'
    },
    name: {
      type: 'string',
      description: 'Nome do usuário logado'
    },
    email: {
      type: 'string',
      description: 'Endereço de e-mail do usuário logado'
    },
    account_type: {
      type: 'string',
      description: 'Tipo da conta do usuário',
      enum: [
        AccountType.manager,
        AccountType.standard
      ]
    }
  }
}
