# 🎨 Design-Focused Agent Prompts for Dashboard & Chat Interface

## 🎯 Overview

Build a **same.dev-inspired** web builder platform with pixel-perfect UI matching the reference images. Focus on frontend excellence with minimal backend complexity.

**Reference Images**: `/home/user/lovico/apps/web/public/attached/Attached_image[1-6].png`

**Key Design Principles from same.dev:**
- **Dark theme**: Background `#0a0a0a`, sidebar `#1a1a1a`, subtle borders
- **3-panel resizable layout**: File tree | Preview | Chat
- **Clean typography**: Inter-like font, excellent spacing
- **Subtle interactions**: Smooth animations, hover states
- **Professional polish**: Same visual quality as same.dev

---

## 📦 Shared Types (Already Defined)

**USE THESE** from `@lovico/common`:

```typescript
// Import from packages/common
import {
  // Chat types
  Message, ChatSession, MessageRole, Model,
  MessageSchema, ChatRequestSchema,

  // File types
  FileNode, FileTree, Language,
  FileNodeSchema, FileTreeSchema,

  // Project types
  Project, ProjectStatus, Framework,

  // Preview types
  PreviewConfig, DeviceType,
} from '@lovico/common'
```

**DO NOT create duplicate types.** Use the existing Zod schemas for validation.

---

## 🎯 PROMPT 1: Professional Sidebar with same.dev Design

**Role**: Senior Design Engineer specializing in UI/UX, Tailwind CSS, dark themes, and micro-interactions

**Objective**: Create a professional dark-themed sidebar matching same.dev's visual design exactly.

### Design Reference

**View these images before starting:**
1. `/home/user/lovico/apps/web/public/attached/Attached_image.png` - Homepage with sidebar
2. `/home/user/lovico/apps/web/public/attached/Attached_image6.png` - Full sidebar with user profile

**Key Visual Elements:**
- **Dark background**: `#1a1a1a` for sidebar
- **Logo at top**: Small icon + "same" wordmark
- **"New Project" button**: Primary button style, full width
- **Collapsible sections**: "Favorites", "Recents" with chevron icons
- **Project cards**: Icon + name, hover state with subtle background
- **User profile at bottom**: Avatar + name + email + "Free" badge
- **Smooth transitions**: 200ms ease for all interactions

### Implementation Requirements

**1. Install Required Icons (if not already)**

```bash
cd apps/web
# lucide-react should already be installed
```

**2. Create Sidebar Component**

File: `apps/web/components/dashboard/sidebar.tsx`

**Design Specs:**
- Width: `256px` (expanded), `72px` (collapsed)
- Background: `bg-[#1a1a1a]`
- Border right: `border-r border-white/5`
- Text: `text-white` (primary), `text-neutral-400` (secondary)
- Hover: `hover:bg-white/5` with `transition-colors duration-200`

```typescript
'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, FolderIcon, Plus } from 'lucide-react'
import { Button } from '@lovico/ui/components/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@lovico/ui/components/collapsible'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { authClient } from '@lovico/auth/client'

interface SidebarProps {
  isCollapsed?: boolean
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const session = authClient.useSession()

  // TODO: Replace with real tRPC query
  const mockProjects = [
    { id: '1', name: 'Appointment Booking System', icon: '📅' },
    { id: '2', name: 'C-Auth Wi-Fi PWA', icon: '🔐' },
  ]

  return (
    <aside
      className={cn(
        "h-screen border-r border-white/5 bg-[#1a1a1a] flex flex-col transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/5">
        {/* TODO: Add your logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/10 rounded" />
          {!isCollapsed && <span className="font-semibold text-white">Lovico</span>}
        </div>
      </div>

      {/* New Project Button */}
      <div className="p-4">
        <Button
          className="w-full bg-white text-black hover:bg-white/90"
          size={isCollapsed ? "icon" : "default"}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Project</span>}
        </Button>
      </div>

      {/* Project Lists */}
      <ScrollArea className="flex-1 px-2">
        {/* Favorites */}
        <ProjectSection
          title="Favorites"
          projects={[]}
          isCollapsed={isCollapsed}
          emptyMessage="No favorites yet."
        />

        {/* Recents */}
        <ProjectSection
          title="Recents"
          projects={mockProjects}
          isCollapsed={isCollapsed}
        />

        {/* All Projects Link */}
        {!isCollapsed && (
          <button className="w-full px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-md flex items-center justify-between transition-colors">
            All Projects
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </ScrollArea>

      {/* User Profile */}
      {session.data?.user && (
        <div className="border-t border-white/5 p-4">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <img
                src={session.data.user.image || '/default-avatar.png'}
                alt={session.data.user.name || 'User'}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session.data.user.name}
                </p>
                <p className="text-xs text-neutral-400 truncate">
                  {session.data.user.email}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-white/10 rounded text-neutral-300">
                Free
              </span>
            </div>
          ) : (
            <img
              src={session.data.user.image || '/default-avatar.png'}
              alt={session.data.user.name || 'User'}
              className="w-10 h-10 rounded-full mx-auto"
            />
          )}
        </div>
      )}
    </aside>
  )
}

function ProjectSection({
  title,
  projects,
  isCollapsed,
  emptyMessage,
}: {
  title: string
  projects: Array<{ id: string; name: string; icon: string }>
  isCollapsed: boolean
  emptyMessage?: string
}) {
  const [isOpen, setIsOpen] = useState(true)

  if (isCollapsed) return null

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
      <CollapsibleTrigger className="w-full px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
        {isOpen ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        {title.toUpperCase()}
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-1">
        {projects.length === 0 ? (
          <p className="px-3 py-2 text-sm text-neutral-500">{emptyMessage}</p>
        ) : (
          projects.map((project) => (
            <button
              key={project.id}
              className="w-full px-3 py-2 text-sm text-white hover:bg-white/5 rounded-md flex items-center gap-3 transition-colors group"
            >
              <span className="text-lg">{project.icon}</span>
              <span className="flex-1 text-left truncate group-hover:text-white">
                {project.name}
              </span>
            </button>
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
```

**3. Update Dashboard Layout**

File: `apps/web/app/dashboard/layout.tsx`

```typescript
import { Sidebar } from '@/components/dashboard/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
```

**4. Add Dark Theme Colors**

File: `packages/ui/src/styles/globals.css`

Add these same.dev-inspired colors:

```css
@layer base {
  :root {
    --same-dark-bg: 10 10 10; /* #0a0a0a */
    --same-dark-sidebar: 26 26 26; /* #1a1a1a */
    --same-dark-border: 255 255 255 / 0.05;
    --same-accent-blue: 59 130 246; /* #3b82f6 */
  }
}
```

### Acceptance Criteria

- [ ] Sidebar matches same.dev visual design (dark theme, spacing, typography)
- [ ] "New Project" button has proper styling (white background, black text)
- [ ] Collapsible sections work smoothly (Favorites, Recents)
- [ ] Project cards have hover states (subtle background change)
- [ ] User profile at bottom shows avatar, name, email, badge
- [ ] Smooth transitions (200ms) for all interactions
- [ ] Responsive: collapses on mobile (<768px)
- [ ] No TypeScript errors
- [ ] No console warnings

### Testing Steps

1. View `/home/user/lovico/apps/web/public/attached/Attached_image6.png` side-by-side
2. Run `bun dev:web` and navigate to `/dashboard`
3. Compare colors, spacing, typography with reference image
4. Test hover states on project cards
5. Test collapsible sections (expand/collapse)
6. Verify user profile displays correctly
7. Test on mobile viewport

### Backend Integration TODOs

```typescript
// TODO: Replace mockProjects with real tRPC query
// import { trpc } from '@/trpc/client'
// const { data: projects } = trpc.project.getRecent.useQuery()

// TODO: Add project creation handler
// const createProject = trpc.project.create.useMutation()
// onClick={() => createProject.mutate({ name: 'New Project' })}
```

---

## 🎯 PROMPT 2: Chat Interface with Activity Log Design

**Role**: Senior Design Engineer specializing in chat interfaces, real-time UX, and AI interactions

**Objective**: Create a chat panel matching same.dev's activity log style with message streaming.

### Design Reference

**View these images:**
1. `/home/user/lovico/apps/web/public/attached/Attached_image2.png` - Chat panel with activity log
2. `/home/user/lovico/apps/web/public/attached/Attached_image3.png` - Chat with file activity
3. `/home/user/lovico/apps/web/public/attached/Attached_image6.png` - Full chat interface

**Key Visual Elements:**
- **Background**: `#1a1a1a` (matches sidebar)
- **Activity log format**: File icons + descriptions + line numbers/tokens
- **Message grouping**: User messages (right-aligned?), assistant messages (activity log style)
- **Prompt input**: Bottom-fixed, with "Add context" button above
- **Model selector**: Dropdown showing current model (e.g., "gemini-2.5-pro")
- **Action buttons**: Copy, regenerate on message hover

### Implementation Requirements

**1. Use Existing Types**

```typescript
import { Message, ChatSession, Model } from '@lovico/common'
```

**2. Create Chat Panel Component**

File: `apps/web/components/chat/chat-panel.tsx`

**Design Specs:**
- Width: `400px` (default, resizable)
- Background: `bg-[#1a1a1a]`
- Border left: `border-l border-white/5`
- Messages: Activity log style with icons
- Input: Fixed at bottom with model selector

```typescript
'use client'
import { useState } from 'react'
import { Send, Paperclip, Settings } from 'lucide-react'
import { Button } from '@lovico/ui/components/button'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { Textarea } from '@lovico/ui/components/textarea'
import type { Message } from '@lovico/common'

interface ChatPanelProps {
  projectId: string
  messages?: Message[]
}

export function ChatPanel({ projectId, messages = [] }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [selectedModel, setSelectedModel] = useState<string>('claude-3-sonnet')

  const handleSend = () => {
    if (!input.trim()) return

    // TODO: Send message to backend
    console.log('Sending:', input)
    setInput('')
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-l border-white/5">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
        <h2 className="text-sm font-semibold text-white">Chat</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4 text-neutral-400" />
        </Button>
      </div>

      {/* Messages - Activity Log Style */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {/* Initial message */}
          <ActivityMessage
            icon="✨"
            title="Started appointment-booking"
            subtitle="with nextjs-shadcn"
            timestamp="Just now"
          />

          {/* File activity */}
          <ActivityMessage
            icon="📄"
            title="Listed directory"
            subtitle="appointment-booking (23 items)"
            timestamp="1s ago"
          />

          <ActivityMessage
            icon="📖"
            title="Read package.json"
            subtitle="(1-200)"
            timestamp="2s ago"
          />

          {/* TODO: Map real messages */}
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-white/5 p-4 space-y-3">
        {/* Add Context Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-neutral-400 hover:text-white"
        >
          <Paperclip className="h-4 w-4 mr-2" />
          Add context
        </Button>

        {/* Prompt Input */}
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSend()
              }
            }}
            placeholder="Tell Same what you want"
            className="resize-none bg-white/5 border-white/10 text-white placeholder:text-neutral-500 pr-24"
            rows={3}
          />

          {/* Model Selector + Send Button */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-neutral-300"
            >
              <option value="claude-3-sonnet">claude-3-sonnet</option>
              <option value="claude-3-opus">claude-3-opus</option>
              <option value="gpt-4o">gpt-4o</option>
            </select>

            <Button
              onClick={handleSend}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityMessage({
  icon,
  title,
  subtitle,
  timestamp,
}: {
  icon: string
  title: string
  subtitle: string
  timestamp: string
}) {
  return (
    <div className="flex items-start gap-3 group">
      <span className="text-xl mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-neutral-400">{subtitle}</p>
      </div>
      <span className="text-xs text-neutral-500">{timestamp}</span>
    </div>
  )
}

function MessageItem({ message }: { message: Message }) {
  // TODO: Implement message rendering with markdown
  return (
    <div className="p-3 rounded-lg bg-white/5">
      <p className="text-sm text-white">{message.content}</p>
    </div>
  )
}
```

**3. Integrate with Dashboard**

File: `apps/web/app/dashboard/[id]/page.tsx`

```typescript
import { ChatPanel } from '@/components/chat/chat-panel'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@lovico/ui/components/resizable'

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Preview Panel */}
      <ResizablePanel defaultSize={60} minSize={40}>
        <div className="h-full bg-white">
          {/* TODO: Web preview iframe */}
          <p className="text-center mt-20">Preview Area</p>
        </div>
      </ResizablePanel>

      <ResizableHandle className="w-px bg-white/5" />

      {/* Chat Panel */}
      <ResizablePanel defaultSize={40} minSize={30} maxSize={50}>
        <ChatPanel projectId={params.id} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### Acceptance Criteria

- [ ] Chat panel matches same.dev visual design
- [ ] Activity log format shows file operations with icons
- [ ] Prompt input fixed at bottom with proper styling
- [ ] Model selector dropdown works
- [ ] "Add context" button above input
- [ ] Send button (Cmd+Enter or click)
- [ ] Smooth scrolling for messages
- [ ] No TypeScript errors

### Testing Steps

1. Compare with `/home/user/lovico/apps/web/public/attached/Attached_image2.png`
2. Navigate to `/dashboard/test-project`
3. Verify activity messages display correctly
4. Test prompt input and send button
5. Test model selector dropdown
6. Verify Cmd+Enter sends message

### Backend Integration TODOs

```typescript
// TODO: Connect to AI SDK or custom API
// import { useChat } from 'ai/react'
// const { messages, input, handleInputChange, handleSubmit } = useChat({
//   api: '/api/chat',
//   body: { projectId, model: selectedModel },
// })

// TODO: Parse LLM responses for activity log format
// Extract file operations, code generations, etc.
```

---

## 🎯 PROMPT 3: File Tree with Code Viewer (same.dev Style)

**Role**: Senior Design Engineer specializing in file explorers, code viewers, and syntax highlighting

**Objective**: Create a file tree and code viewer matching same.dev's visual design.

### Design Reference

**View this image:**
- `/home/user/lovico/apps/web/public/attached/Attached_image3.png` - File tree + code editor

**Key Visual Elements:**
- **File tree**: Dark background `#1a1a1a`, nested folders, file type icons
- **Search bar**: At top of file tree
- **Code viewer**: Dark theme, line numbers, syntax highlighting
- **File tabs**: Show open files at top
- **Terminal**: Optional panel at bottom

### Implementation Requirements

**1. Use Existing Types**

```typescript
import { FileNode, FileTree } from '@lovico/common'
```

**2. Create File Tree Component**

File: `apps/web/components/code-viewer/file-tree.tsx`

**Design Specs:**
- Width: `240px` (default, resizable)
- Background: `bg-[#1a1a1a]`
- Search: Top bar with icon
- Icons: Different colors for file types
- Hover: `hover:bg-white/5`

```typescript
'use client'
import { useState } from 'react'
import { ChevronDown, ChevronRight, File, Folder, Search } from 'lucide-react'
import { Input } from '@lovico/ui/components/input'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import type { FileNode } from '@lovico/common'

interface FileTreeProps {
  files: FileNode[]
  selectedFile?: FileNode
  onFileSelect: (file: FileNode) => void
}

export function FileTree({ files, selectedFile, onFileSelect }: FileTreeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedPaths(newExpanded)
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-r border-white/5">
      {/* Search Bar */}
      <div className="p-3 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 h-9 text-sm"
          />
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {files.map((node) => (
            <FileTreeNode
              key={node.id}
              node={node}
              depth={0}
              isExpanded={expandedPaths.has(node.path)}
              isSelected={selectedFile?.id === node.id}
              onToggle={() => toggleExpand(node.path)}
              onSelect={() => node.type === 'file' && onFileSelect(node)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function FileTreeNode({
  node,
  depth,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
}: {
  node: FileNode
  depth: number
  isExpanded: boolean
  isSelected: boolean
  onToggle: () => void
  onSelect: () => void
}) {
  const isFolder = node.type === 'directory'
  const paddingLeft = `${depth * 12 + 8}px`

  return (
    <>
      <button
        onClick={isFolder ? onToggle : onSelect}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors",
          isSelected && "bg-white/10 text-white",
          !isSelected && "text-neutral-300 hover:bg-white/5 hover:text-white"
        )}
        style={{ paddingLeft }}
      >
        {isFolder && (
          isExpanded ? (
            <ChevronDown className="h-3 w-3 text-neutral-400" />
          ) : (
            <ChevronRight className="h-3 w-3 text-neutral-400" />
          )
        )}

        {isFolder ? (
          <Folder className="h-4 w-4 text-blue-400" />
        ) : (
          <FileIcon name={node.name} />
        )}

        <span className="flex-1 text-left truncate">{node.name}</span>
      </button>

      {isFolder && isExpanded && node.children && (
        node.children.map((child) => (
          <FileTreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
            isExpanded={false}
            isSelected={false}
            onToggle={() => {}}
            onSelect={onSelect}
          />
        ))
      )}
    </>
  )
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split('.').pop()

  const iconColors: Record<string, string> = {
    tsx: 'text-blue-400',
    ts: 'text-blue-500',
    jsx: 'text-yellow-400',
    js: 'text-yellow-500',
    css: 'text-pink-400',
    json: 'text-green-400',
    md: 'text-purple-400',
  }

  return <File className={cn("h-4 w-4", iconColors[ext || ''] || 'text-neutral-400')} />
}
```

**3. Create Code Viewer**

File: `apps/web/components/code-viewer/code-viewer.tsx`

```typescript
'use client'
import { Copy, Check } from 'lucide-react'
import { Button } from '@lovico/ui/components/button'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { useState } from 'react'
import type { FileNode } from '@lovico/common'

interface CodeViewerProps {
  file: FileNode
}

export function CodeViewer({ file }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(file.content || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = file.content?.split('\n') || []

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      {/* File Tab */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-white/5">
        <span className="text-sm text-white">{file.name}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 text-neutral-400 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Code Content */}
      <ScrollArea className="flex-1">
        <div className="font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className="flex hover:bg-white/5">
              <span className="inline-block w-12 text-right pr-4 text-neutral-500 select-none">
                {i + 1}
              </span>
              <span className="flex-1 text-neutral-200 pr-4">
                {line || ' '}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
```

**4. Integrate with Dashboard (3-Panel Layout)**

File: `apps/web/app/dashboard/[id]/page.tsx`

```typescript
import { FileTree } from '@/components/code-viewer/file-tree'
import { CodeViewer } from '@/components/code-viewer/code-viewer'
import { ChatPanel } from '@/components/chat/chat-panel'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@lovico/ui/components/resizable'
import { useState } from 'react'
import type { FileNode } from '@lovico/common'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  // TODO: Fetch real file tree from backend
  const mockFiles: FileNode[] = [
    {
      id: '1',
      name: 'src',
      type: 'directory',
      path: 'src',
      children: [
        {
          id: '2',
          name: 'App.tsx',
          type: 'file',
          path: 'src/App.tsx',
          content: 'import React from "react"\n\nexport default function App() {\n  return <div>Hello</div>\n}',
          language: 'tsx',
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-white">Project Name</h1>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm text-white bg-white/10 rounded">
              Preview
            </button>
            <button className="px-3 py-1 text-sm text-neutral-400 hover:text-white rounded">
              Code
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded">
            Pro
          </button>
          {/* Add more action buttons */}
        </div>
      </div>

      {/* Three-Panel Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Tree */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileTree
            files={mockFiles}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </ResizablePanel>

        <ResizableHandle className="w-px bg-white/5" />

        {/* Code/Preview */}
        <ResizablePanel defaultSize={50} minSize={35}>
          {selectedFile ? (
            <CodeViewer file={selectedFile} />
          ) : (
            <div className="h-full flex items-center justify-center bg-[#0a0a0a] text-neutral-500">
              Select a file to view
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle className="w-px bg-white/5" />

        {/* Chat */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={45}>
          <ChatPanel projectId={params.id} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
```

### Acceptance Criteria

- [ ] File tree matches same.dev visual design
- [ ] Search bar at top of file tree
- [ ] File type icons with different colors
- [ ] Collapsible folders with chevron icons
- [ ] Code viewer shows line numbers
- [ ] Copy button works
- [ ] Three-panel resizable layout
- [ ] Top bar with project name and tabs
- [ ] No TypeScript errors

### Testing Steps

1. Compare with `/home/user/lovico/apps/web/public/attached/Attached_image3.png`
2. Navigate to `/dashboard/test-project`
3. Verify file tree displays correctly
4. Click folder to expand/collapse
5. Click file to view code
6. Test copy button
7. Resize panels

### Backend Integration TODOs

```typescript
// TODO: Fetch file tree from backend
// const { data: fileTree } = trpc.file.getTree.useQuery({ projectId })

// TODO: Add syntax highlighting with shiki
// import { codeToHtml } from 'shiki'
```

---

## 🎯 PROMPT 4: Visual Polish & same.dev Quality

**Role**: Senior Design Engineer obsessed with pixel-perfect UI, micro-interactions, and dark themes

**Objective**: Polish every detail to match same.dev's professional quality.

### Design Reference

**Review ALL images** to understand the level of polish:
- `/home/user/lovico/apps/web/public/attached/Attached_image[1-6].png`

**Focus Areas:**
1. **Color consistency**: All dark backgrounds, borders, text colors match
2. **Spacing**: Consistent padding, margins, gap sizes
3. **Typography**: Font sizes, weights, line heights
4. **Transitions**: 200ms duration for all hover states
5. **Borders**: Subtle `border-white/5` everywhere
6. **Hover states**: Smooth, subtle background changes
7. **Loading states**: Skeletons, spinners
8. **Empty states**: Helpful messages

### Implementation Checklist

**1. Theme Colors Audit**

File: `packages/ui/src/styles/globals.css`

Ensure these exact colors:

```css
@layer base {
  .dark {
    --background: 10 10 10; /* #0a0a0a */
    --foreground: 255 255 255; /* #ffffff */
    --muted: 38 38 38; /* #262626 */
    --muted-foreground: 163 163 163; /* #a3a3a3 */
    --border: 255 255 255 / 0.05;
    --accent: 59 130 246; /* #3b82f6 */
  }
}
```

**2. Add Smooth Transitions**

Add to all interactive elements:

```typescript
className="transition-colors duration-200"
```

**3. Loading States**

Create skeleton loader:

File: `apps/web/components/ui/skeleton-loader.tsx`

```typescript
export function ProjectCardSkeleton() {
  return (
    <div className="px-3 py-2 space-y-2 animate-pulse">
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/2" />
    </div>
  )
}
```

**4. Empty States**

```typescript
function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <p className="text-sm text-neutral-400 mb-1">{title}</p>
      <p className="text-xs text-neutral-500">{description}</p>
    </div>
  )
}
```

**5. Hover State Consistency**

All buttons, cards, links should use:

```typescript
className="hover:bg-white/5 transition-colors duration-200"
```

**6. Typography Scale**

- Headings: `text-sm font-semibold` (12px semibold)
- Body: `text-sm` (14px regular)
- Secondary: `text-xs text-neutral-400` (12px muted)
- Code: `font-mono text-sm`

**7. Spacing Scale**

- Padding: `p-4` (16px), `p-3` (12px), `p-2` (8px)
- Gap: `gap-4` (16px), `gap-3` (12px), `gap-2` (8px)
- Margins: Use sparingly, prefer gap

**8. Responsive Breakpoints**

- Mobile: `< 768px` - Stack panels vertically, collapse sidebar
- Tablet: `768px - 1024px` - 2-column layout
- Desktop: `> 1024px` - 3-panel layout

**9. Add Keyboard Shortcuts**

```typescript
// Cmd+N: New project
// Cmd+B: Toggle sidebar
// Cmd+Enter: Send message
// Cmd+K: Command palette (future)
```

**10. Accessibility**

- Add `aria-label` to icon buttons
- Add `role="button"` to clickable divs
- Ensure color contrast ≥4.5:1
- Keyboard navigation (tab, arrow keys)

### Final Testing Checklist

- [ ] Side-by-side comparison with all 6 reference images
- [ ] All colors match same.dev exactly
- [ ] All hover states smooth (200ms transition)
- [ ] Typography consistent (sizes, weights, colors)
- [ ] Spacing consistent (padding, gaps, margins)
- [ ] Loading states implemented (skeletons)
- [ ] Empty states with helpful messages
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Lighthouse accessibility ≥90

### Visual Comparison Tool

Run this to compare your implementation:

```bash
# Take screenshot of your app
# Place next to reference images
# Compare pixel-by-pixel

# Tools: Figma, Photoshop, or browser DevTools overlay
```

---

## 📝 Summary

These 4 prompts focus on:
1. **Visual design excellence** matching same.dev
2. **Frontend only** (minimal backend, use TODOs)
3. **Existing types** from `@lovico/common`
4. **Reference images** embedded in each prompt

**Execution Order:**
1. PROMPT 1 → Sidebar (2-3 hours)
2. PROMPT 2 → Chat Panel (3-4 hours)
3. PROMPT 3 → File Tree + Code Viewer (4-5 hours)
4. PROMPT 4 → Visual Polish (3-4 hours)

**Total: ~12-16 hours** of focused UI work.

**Backend TODOs** clearly marked with `// TODO:` comments for manual implementation later.
