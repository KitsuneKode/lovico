import { serverConfig as config } from '@lovico/backend-common/config'

export { config }
export const DATABASE_URL = config.getConfig('dbUrl')
export const PORT = config.getConfig('port')
export const NODE_ENV = config.getConfig('nodeEnv')
export const ALLOWED_ORIGINS = config.getConfig('allowedOrigins')
