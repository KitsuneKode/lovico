import { z } from 'zod'

// Model Enum (as requested)
export const ModelEnum = z.enum([
  'gpt-4o',
  'gpt-4-turbo',
  'claude-3-opus',
  'claude-3-sonnet',
  'deepseek-r1',
  'gemini-pro',
])

// Message Role
export const MessageRoleEnum = z.enum(['user', 'assistant', 'system', 'tool'])

// Tool Call Schema
export const ToolCallSchema = z.object({
  id: z.string(),
  name: z.string(),
  arguments: z.record(z.any()),
})

// Message Attachment Schema (image and text only)
export const MessageAttachmentSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'text']),
  name: z.string(),
  url: z.string().url().optional(),
  content: z.string().optional(),
})

// Message Schema
export const MessageSchema = z.object({
  id: z.string().uuid(),
  role: MessageRoleEnum,
  content: z.string(),
  model: ModelEnum.optional(),
  attachments: z.array(MessageAttachmentSchema).optional(),
  toolCalls: z.array(ToolCallSchema).optional(),
  sources: z.array(z.string().url()).optional(),
  reasoningSteps: z.array(z.string()).optional(),
  timestamp: z.date(),
  projectId: z.string().uuid(),
  parentMessageId: z.string().uuid().optional(), // For branching
})

// Chat Session Schema
export const ChatSessionSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  messages: z.array(MessageSchema),
  model: ModelEnum,
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().optional(),
  webSearchEnabled: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Chat Request Schema (for API)
export const ChatRequestSchema = z.object({
  message: z.string().min(1),
  model: ModelEnum,
  projectId: z.string().uuid(),
  attachments: z.array(MessageAttachmentSchema).optional(),
  webSearchEnabled: z.boolean().optional(),
  temperature: z.number().min(0).max(2).optional(),
})

// Type exports
export type Message = z.infer<typeof MessageSchema>
export type ChatSession = z.infer<typeof ChatSessionSchema>
export type ChatRequest = z.infer<typeof ChatRequestSchema>
export type MessageRole = z.infer<typeof MessageRoleEnum>
export type Model = z.infer<typeof ModelEnum>
export type ToolCall = z.infer<typeof ToolCallSchema>
export type MessageAttachment = z.infer<typeof MessageAttachmentSchema>
