import { NODE_ENV, PORT, config } from '@/utils/config'
import { logger } from '@/utils/logger'
import cluster from 'cluster'
import app from '@/app'
import os from 'os'

config.validateAll()

const numCPUs = NODE_ENV === 'development' ? 1 : os.cpus().length

if (cluster.isPrimary) {
  logger.info(`Master process ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.warn(
      `Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}, Restarting...`,
    )
    cluster.fork()
  })
} else {
  const server = app.listen(PORT, (err) => {
    if (err) {
      logger.error(`Worker ${process.pid} failed to start server:`, err)
      process.exit(1)
    } else {
      logger.info(`Worker ${process.pid} started server on PORT ${PORT}`)
    }
  })

  const gracefulShutdown = () => {
    logger.info(`Worker ${process.pid} received shutdown signal. Shutting down gracefully...`)
    server.close(() => {
      logger.info(`Worker ${process.pid} closed.`)
      process.exit(0)
    })

    setTimeout(() => {
      logger.error(`Worker ${process.pid} forced to exit after shutdown timeout.`)
      process.exit(1)
    }, 10000)
  }

  process.on('SIGINT', gracefulShutdown)
  process.on('SIGTERM', gracefulShutdown)
}
