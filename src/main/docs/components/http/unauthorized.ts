export const unauthorized = {
  description: 'Requisição não autorizada',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/common/error'
      }
    }
  }
}

export const unauthorizedRef = '#/components/unauthorized'
