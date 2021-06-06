import { AccountType } from '@/domain/auth'

export const accountModelSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'Identificador do usuário logado'
    },
    name: {
      type: 'string',
      description: 'Nome do usuário logado'
    },
    email_validated: {
      type: 'boolean',
      description: 'Endereço de e-mail validado?'
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
