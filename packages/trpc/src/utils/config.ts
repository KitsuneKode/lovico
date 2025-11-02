import { serverConfig as config } from '@lovico/backend-common/config'

export { config }

export const FRONTEND_URL = config.getConfig('frontendUrl')
export const NODE_ENV = config.getConfig('nodeEnv')
