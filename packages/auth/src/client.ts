import { createAuthClient } from 'better-auth/react' // make sure to import from better-auth/react
import { APP_URL } from '@lovico/common/config'

export const authClient = createAuthClient({
  baseURL: APP_URL,
})
