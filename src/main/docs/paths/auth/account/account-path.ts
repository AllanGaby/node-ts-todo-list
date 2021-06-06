import { serverErrorRef, unprocessableEntityRef, conflictRef, noContentRef, unauthorizedRef } from '@/main/docs/components/http'

export const accountPath = {
  post: {
    tags: ['Conta de usuário'],
    summary: 'Cria uma nova conta de usuário',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/auth/encryptedRequest/createRequest'
          }
        }
      }
    },
    responses: {
      204: {
        $ref: noContentRef
      },
      409: {
        $ref: conflictRef
      },
      422: {
        $ref: unprocessableEntityRef
      },
      500: {
        $ref: serverErrorRef
      }
    }
  },
  get: {
    tags: ['Conta de usuário'],
    summary: 'Retornar a conta do usuário logado',
    security: [{
      accessToken: []
    }],
    responses: {
      200: {
        description: 'Informações do usuário logado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/auth/account/model'
            }
          }
        }
      },
      401: {
        $ref: unauthorizedRef
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
