export const unprocessableEntity = {
  description: 'Existem parâmetros inválidos ou não informados',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/common/error'
      }
    }
  }
}

export const unprocessableEntityRef = '#/components/unprocessableEntity'
