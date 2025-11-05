import { z } from 'zod'

// File Type Enum
export const FileTypeEnum = z.enum(['file', 'directory'])

// Language Enum
export const LanguageEnum = z.enum([
  'typescript',
  'javascript',
  'jsx',
  'tsx',
  'css',
  'scss',
  'html',
  'json',
  'markdown',
  'yaml',
  'toml',
  'sql',
  'graphql',
  'dockerfile',
  'shell',
  'python',
  'rust',
  'go',
  'java',
  'plaintext',
])

// File Node Schema (recursive)
// We need to define the type first for the recursive reference
export type FileNode = {
  id: string
  name: string
  type: z.infer<typeof FileTypeEnum>
  path: string
  content?: string
  language?: z.infer<typeof LanguageEnum>
  size?: number
  children?: FileNode[]
  isExpanded?: boolean
  isSelected?: boolean
  lastModified?: Date
}

export const FileNodeSchema: z.ZodType<FileNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    type: FileTypeEnum,
    path: z.string(),
    content: z.string().optional(),
    language: LanguageEnum.optional(),
    size: z.number().optional(),
    children: z.array(FileNodeSchema).optional(),
    isExpanded: z.boolean().optional(),
    isSelected: z.boolean().optional(),
    lastModified: z.date().optional(),
  }),
)

// File Tree Schema
export const FileTreeSchema = z.object({
  rootPath: z.string(),
  files: z.array(FileNodeSchema),
  selectedFile: z.string().optional(),
  expandedPaths: z.array(z.string()).optional(),
})

// File Operation Schema
export const FileOperationSchema = z.object({
  type: z.enum(['create', 'update', 'delete', 'rename', 'move']),
  path: z.string(),
  newPath: z.string().optional(),
  content: z.string().optional(),
  timestamp: z.date(),
})

// Type exports
export type FileTree = z.infer<typeof FileTreeSchema>
export type FileType = z.infer<typeof FileTypeEnum>
export type Language = z.infer<typeof LanguageEnum>
export type FileOperation = z.infer<typeof FileOperationSchema>
