export const notFound = {
  description: 'Rota inválida ou não existe',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/common/error'
      }
    }
  }
}

export const notFoundRef = '#/components/notFound'
