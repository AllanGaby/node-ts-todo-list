import paths from '@/main/docs/paths'
import schemas from '@/main/docs/schemas'
import components from '@/main/docs/components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node Typescript - Skeleton',
    description: '',
    version: '1.0.0',
    contact: {
      name: 'Allan Gaby',
      email: 'allan.gaby@gmail.com',
      url: 'https://www.linkedin.com/in/allan-gaby'
    }
  },
  servers: [{
    url: '/api',
    description: 'Node Typescript - Skeleton'
  }],
  paths,
  schemas,
  components
}
