import { sessionPath } from './session-path'
import { sessionRefreshPath } from './session-refresh-path'

export default {
  '/auth/session': sessionPath,
  '/auth/session/refresh': sessionRefreshPath
}
