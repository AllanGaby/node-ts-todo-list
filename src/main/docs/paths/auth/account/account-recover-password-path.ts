import { serverErrorRef, unprocessableEntityRef, noContentRef, unauthorizedRef } from '@/main/docs/components/http'

export const accountRecoverPasswordPath = {
  post: {
    tags: ['Conta de usuário'],
    summary: 'Solicita a recuperação de senha do usuário',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                description: 'Endereço de e-mail do usuário'
              }
            }
          }
        }
      }
    },
    responses: {
      204: {
        $ref: noContentRef
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
  patch: {
    tags: ['Conta de usuário'],
    summary: 'Recupera a senha de acesso do usuário',
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
