import authSchemas from '@/main/docs/schemas/auth'
import commonSchemas from '@/main/docs/schemas/common'

export default {
  auth: {
    ...authSchemas
  },
  common: {
    ...commonSchemas
  }
}
