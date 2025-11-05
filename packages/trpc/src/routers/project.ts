import { protectedProcedure, publicProcedure } from '../trpc'
import type { TRPCRouterRecord } from '@trpc/server'
import { prisma as db } from '@lovico/store'
import { z } from 'zod'

export const projectRouter = {
  // Get all projects for the authenticated user
  getUserProjects: protectedProcedure.query(async ({ ctx }) => {
    return db.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        generations: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
  }),

  // Get featured projects for hall of fame
  getFeaturedProjects: publicProcedure.query(async () => {
    return db.project.findMany({
      where: {
        isPublic: true,
        isFeatured: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 12,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
  }),

  // Get a specific project by ID
  getProjectById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await db.project.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          generations: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      })

      if (!project) {
        throw new Error('Project not found')
      }

      return project
    }),

  // Create a new project
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Project name is required'),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return db.project.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.session.user.id,
        },
      })
    }),

  // Update a project
  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        isPublic: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input

      // Verify ownership
      const project = await db.project.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      })

      if (!project) {
        throw new Error('Project not found')
      }

      return db.project.update({
        where: { id },
        data,
      })
    }),

  // Delete a project
  deleteProject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const project = await db.project.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      })

      if (!project) {
        throw new Error('Project not found')
      }

      return db.project.delete({
        where: { id: input.id },
      })
    }),

  // Create a new generation for a project
  createGeneration: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        prompt: z.string().min(1),
        html: z.string(),
        css: z.string().optional(),
        javascript: z.string().optional(),
        files: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify project ownership
      const project = await db.project.findFirst({
        where: {
          id: input.projectId,
          userId: ctx.session.user.id,
        },
      })

      if (!project) {
        throw new Error('Project not found')
      }

      return db.generation.create({
        data: {
          projectId: input.projectId,
          prompt: input.prompt,
          html: input.html,
          css: input.css,
          javascript: input.javascript,
          files: input.files,
        },
      })
    }),

  // Get generation by ID
  getGenerationById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const generation = await db.generation.findFirst({
        where: {
          id: input.id,
        },
        include: {
          project: true,
        },
      })

      if (!generation || generation.project.userId !== ctx.session.user.id) {
        throw new Error('Generation not found')
      }

      return generation
    }),
} satisfies TRPCRouterRecord
