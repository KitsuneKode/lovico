import { clientConfig as config } from '@lovico/common/config'

export { config }
config.validateAll()

export const APP_URL = config.getConfig('appUrl')
export const API_URL = config.getConfig('apiBaseUrl')
export const NODE_ENV = config.getConfig('nodeEnv')
