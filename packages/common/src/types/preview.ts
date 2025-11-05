import { z } from 'zod'

// Device Type Enum
export const DeviceTypeEnum = z.enum(['desktop', 'tablet', 'mobile'])

// Preview State Enum
export const PreviewStateEnum = z.enum(['loading', 'ready', 'error', 'refreshing'])

// Device Frame Schema
export const DeviceFrameSchema = z.object({
  type: DeviceTypeEnum,
  width: z.number(),
  height: z.number(),
  scale: z.number().min(0.25).max(2),
})

// Preview Config Schema
export const PreviewConfigSchema = z.object({
  url: z.string().url(),
  device: DeviceFrameSchema,
  state: PreviewStateEnum,
  errorMessage: z.string().optional(),
  sandboxId: z.string().optional(),
  port: z.number().optional(),
  autoRefresh: z.boolean().default(true),
})

// Sandbox Schema
export const SandboxSchema = z.object({
  id: z.string(),
  projectId: z.string().uuid(),
  url: z.string().url(),
  status: z.enum(['starting', 'running', 'stopped', 'error']),
  framework: z.string(),
  nodeVersion: z.string().optional(),
  port: z.number(),
  createdAt: z.date(),
  expiresAt: z.date(),
})

// Type exports
export type DeviceType = z.infer<typeof DeviceTypeEnum>
export type PreviewState = z.infer<typeof PreviewStateEnum>
export type DeviceFrame = z.infer<typeof DeviceFrameSchema>
export type PreviewConfig = z.infer<typeof PreviewConfigSchema>
export type Sandbox = z.infer<typeof SandboxSchema>
