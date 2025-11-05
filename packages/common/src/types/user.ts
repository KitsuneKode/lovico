import { z } from 'zod'

// User Role Enum
export const UserRoleEnum = z.enum(['user', 'admin', 'pro'])

// User Status Enum
export const UserStatusEnum = z.enum(['active', 'suspended', 'deleted'])

// User Schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().toLowerCase().trim(),
  username: z
    .string()
    .min(3)
    .max(50)
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9_-]+$/),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
  role: UserRoleEnum.default('user'),
  status: UserStatusEnum.default('active'),
  emailVerified: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
})

// Public User Schema (for client-side display)
export const PublicUserSchema = UserSchema.omit({
  email: true,
  emailVerified: true,
})

// User Profile Schema
export const UserProfileSchema = z.object({
  userId: z.string().uuid(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional(),
  location: z.string().max(100).optional(),
  twitter: z.string().max(100).optional(),
  github: z.string().max(100).optional(),
})

// User Settings Schema
export const UserSettingsSchema = z.object({
  userId: z.string().uuid(),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  defaultModel: z.string().default('gpt-4o'),
  codeEditorTheme: z.string().default('vs-dark'),
  autoSave: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  language: z.string().default('en'),
})

// Create/Update DTOs
export const CreateUserSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  username: z
    .string()
    .min(3)
    .max(50)
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9_-]+$/),
  password: z.string().min(8).max(100),
  name: z.string().optional(),
})

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  email: true,
  createdAt: true,
  emailVerified: true,
})

export const UpdateUserProfileSchema = UserProfileSchema.partial().omit({
  userId: true,
})

export const UpdateUserSettingsSchema = UserSettingsSchema.partial().omit({
  userId: true,
})

// Type exports
export type User = z.infer<typeof UserSchema>
export type PublicUser = z.infer<typeof PublicUserSchema>
export type UserProfile = z.infer<typeof UserProfileSchema>
export type UserSettings = z.infer<typeof UserSettingsSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>
export type UpdateUserSettings = z.infer<typeof UpdateUserSettingsSchema>
export type UserRole = z.infer<typeof UserRoleEnum>
export type UserStatus = z.infer<typeof UserStatusEnum>
