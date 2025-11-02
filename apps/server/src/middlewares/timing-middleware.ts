import type { NextFunction, Request, Response } from 'express'
import { NODE_ENV } from '@/utils/config'
import { logger } from '@/utils/logger'

export const timingMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()

  if (NODE_ENV === 'development') {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100
    setTimeout(() => next(), waitMs)
  } else {
    next()
  }
  res.on('finish', () => {
    const end = Date.now()
    logger.info(`[AUTH] ${req.path} took ${end - start}ms to execute`)
  })
}
