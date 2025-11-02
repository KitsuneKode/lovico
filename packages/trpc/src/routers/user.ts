import { protectedProcedure, publicProcedure } from '../trpc'
import type { TRPCRouterRecord } from '@trpc/server'
import { prisma as db } from '@lovico/store'
import { z } from 'zod'

export const userRouter = {
  getUser: publicProcedure.query(() => {
    return { id: '1', name: 'Bilbo' }
  }),
  getAllUser: publicProcedure.query(async () => {
    return db.user.findMany()
  }),
  createUser: protectedProcedure
    .input(z.object({ email: z.email(), name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of classhoice
      return db.user.findMany({
        where: {
          email: opts.input.email,
        },
      })
    }),
} satisfies TRPCRouterRecord
