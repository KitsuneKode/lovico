import { z } from 'zod'

// Project Status Enum
export const ProjectStatusEnum = z.enum(['draft', 'active', 'deployed', 'archived'])

// Framework Enum
export const FrameworkEnum = z.enum(['nextjs', 'react', 'vue', 'svelte', 'vanilla'])

// Project Schema
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  framework: FrameworkEnum,
  status: ProjectStatusEnum,
  thumbnail: z.string().url().optional(),
  previewUrl: z.string().url().optional(),
  userId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Create/Update DTOs
export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateProjectSchema = ProjectSchema.partial().omit({
  id: true,
  userId: true,
})

// Type exports
export type Project = z.infer<typeof ProjectSchema>
export type CreateProject = z.infer<typeof CreateProjectSchema>
export type UpdateProject = z.infer<typeof UpdateProjectSchema>
export type ProjectStatus = z.infer<typeof ProjectStatusEnum>
export type Framework = z.infer<typeof FrameworkEnum>
