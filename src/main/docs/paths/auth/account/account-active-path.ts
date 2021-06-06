import { serverErrorRef, unprocessableEntityRef, noContentRef, notFoundRef } from '@/main/docs/components/http'

export const accountActivePath = {
  get: {
    tags: ['Conta de usuário'],
    summary: 'Ativa uma conta de usuário',
    parameters: [{
      in: 'path',
      name: 'account_id',
      type: 'string',
      format: 'uuid'
    }],
    responses: {
      204: {
        $ref: noContentRef
      },
      404: {
        $ref: notFoundRef
      },
      422: {
        $ref: unprocessableEntityRef
      },
      500: {
        $ref: serverErrorRef
      }
    }
  }
}
