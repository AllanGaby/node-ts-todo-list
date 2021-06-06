import { unauthorizedRef, unprocessableEntityRef, serverErrorRef } from '@/main/docs/components/http'

export const sessionRefreshPath = {
  post: {
    tags: ['Sessão de acesso'],
    summary: 'Atualiza a sessão de acesso',
    security: [{
      accessToken: []
    }],
    responses: {
      200: {
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
  }
}
