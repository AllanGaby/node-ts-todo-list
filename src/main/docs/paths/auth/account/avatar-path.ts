import { serverErrorRef, unprocessableEntityRef, unauthorizedRef, notFoundRef, noContentRef } from '@/main/docs/components/http'

export const avatarPath = {
  patch: {
    tags: ['Conta de usuário'],
    summary: 'Atualiza o avatar do usuário',
    parameters: [{
      in: 'path',
      name: 'account_id',
      type: 'string',
      format: 'uuid'
    }],
    security: [{
      accessToken: []
    }],
    requestBody: {
      required: true,
      content: {
        'image/png': {
          schema: {
            $ref: '#/schemas/auth/account/avatarRequest'
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
  },
  delete: {
    tags: ['Conta de usuário'],
    summary: 'Exlui o avatar do usuário',
    parameters: [{
      in: 'path',
      name: 'profile_id',
      type: 'string',
      format: 'uuid'
    }],
    security: [{
      accessToken: []
    }],
    responses: {
      204: {
        $ref: noContentRef
      },
      401: {
        $ref: unauthorizedRef
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
  },
  get: {
    tags: ['Conta de usuário'],
    summary: 'Busca o avatar do usuário',
    parameters: [{
      in: 'path',
      name: 'account_id',
      type: 'string',
      format: 'uuid'
    }],
    responses: {
      200: {
        content: {
          'image/png': {
            schema: {
              $ref: '#/schemas/auth/account/avatarRequest'
            }
          }
        }
      },
      404: {
        $ref: notFoundRef
      },
      500: {
        $ref: serverErrorRef
      }
    }
  }
}
