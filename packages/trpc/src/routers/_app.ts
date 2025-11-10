import { createTRPCRouter, publicProcedure } from '@/trpc'
import { projectRouter } from './project'
import { userRouter } from './user'
import { authRouter } from './auth'
import { z } from 'zod'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  project: projectRouter,
  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )

    .query(({ input }) => {
      return `Hi ${input.name} from TRPC`
    }),
})

export type AppRouter = typeof appRouter
