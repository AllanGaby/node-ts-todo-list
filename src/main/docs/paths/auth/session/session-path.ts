import { noContentRef, unauthorizedRef, unprocessableEntityRef, serverErrorRef } from '@/main/docs/components/http'

export const sessionPath = {
  post: {
    tags: ['Sessão de acesso'],
    summary: 'Cria uma nova sessão de acesso',
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
      201: {
        description: 'Informações da sessão de acesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/auth/accessToken/model'
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
  },
  delete: {
    tags: ['Sessão de acesso'],
    summary: 'Invalida a sessão de acesso',
    security: [{
      accessToken: []
    }],
    responses: {
      204: {
        $ref: noContentRef
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
