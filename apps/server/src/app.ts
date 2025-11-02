import { toNodeHandler, auth } from '@lovico/auth/server'
import { corsConfig } from '@/utils/cors-config'
import { expressMiddleWare } from '@lovico/trpc'
import { logger } from '@/utils/logger'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

const app = express()

app.use(helmet())
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
)

app.use(cors(corsConfig))
// app.use(timingMiddleWare)

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use('/api/trpc', expressMiddleWare)

app.use(express.json())

app.use('/health', (req, res) => {
  res.json({
    status: 'ok',
  })
})

app.all('{/*splat}', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  })
})

export default app
