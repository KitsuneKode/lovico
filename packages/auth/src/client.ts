import { clientConfig } from '@lovico/common/config'
import { createAuthClient } from 'better-auth/react' // make sure to import from better-auth/react

const APP_URL = clientConfig.getConfig('appUrl')

export const authClient = createAuthClient({
  baseURL: APP_URL,
})
