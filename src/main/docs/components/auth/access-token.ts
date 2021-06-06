import { Config } from '@/main/config/environment'

export const accessToken = {
  type: 'apiKey',
  in: 'header',
  name: Config.auth.accessTokenName
}
