export const conflict = {
  description: 'A requisição infringe uma regra da aplicação',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/common/error'
      }
    }
  }
}

export const conflictRef = '#/components/conflict'
