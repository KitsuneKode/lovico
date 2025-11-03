import { ConfigLoader } from '@lovico/common/config'
import { serverLogger } from './logger'

const serverConfigSchema = {
  port: () => process.env.PORT || 8080,
  frontendUrl: () => process.env.FRONTEND_URL,
  dbUrl: () => process.env.DATABASE_URL,
  nodeEnv: () => process.env.NODE_ENV || 'development',
  betterAuthUrl: () => process.env.BETTER_AUTH_URL,
  betterAuthSecret: () => process.env.BETTER_AUTH_SECRET,
  allowedOrigins: () => process.env.ALLOWED_ORIGINS,
}

export const serverConfig = ConfigLoader.getInstance(serverConfigSchema, 'server', serverLogger)
