# Agent Prompts for Dashboard & Chat Interface Implementation

## Context for All Prompts

**Project**: Lovable-style web builder platform (Next.js 16 + tRPC + Better Auth monorepo)
**Tech Stack**: React 19, TypeScript, Tailwind CSS v4, shadcn/ui, AI SDK, TanStack Query
**Theme**: Custom OKLch color system (defined in packages/ui/src/styles/globals.css)
**Existing Components**: 37+ shadcn components in packages/ui/src/components/

**Key Existing Files:**
- `apps/web/components/ai-elements/prompt-input.tsx` - AI prompt input with file attachments
- `apps/web/components/ai-elements/web-preview.tsx` - Web preview iframe component
- `apps/web/app/dashboard/[id]/dashboard-client.tsx` - Current dashboard with resizable panels
- `packages/ui/src/components/resizable.tsx` - Resizable panels component
- `packages/ui/src/styles/globals.css` - Theme configuration

**DO NOT:**
- Install npm packages manually (use Bun)
- Create duplicate components that already exist
- Modify the root theme colors without explicit instruction
- Use CommonJS syntax (ESM only)

---

## 🎯 PROMPT 1: Dashboard Sidebar Navigation

**Role**: Senior Frontend Engineer with expertise in Next.js App Router, shadcn/ui, and navigation patterns

**Objective**: Create a professional dashboard sidebar with project navigation, settings, and user profile. Use shadcn's dashboard patterns as reference but adapt to our OKLch theme.

### Context

We're building a Lovable/Bolt-style platform where users create websites via LLM prompts. The dashboard needs:
1. Toggleable sidebar (collapsed/expanded states)
2. Project list with "New Project" action
3. Navigation items (Dashboard, Projects, Settings, etc.)
4. User profile section at bottom
5. Mobile-responsive (drawer on mobile)

### Current State

- Sidebar component exists at `packages/ui/src/components/sidebar.tsx` (shadcn primitive)
- Current dashboard at `apps/web/app/dashboard/page.tsx` uses basic SidebarProvider
- Theme uses OKLch colors with CSS variables (--sidebar-primary, --sidebar-accent, etc.)
- Better Auth provides session via `authClient.useSession()`

### Implementation Requirements

**1. Check Existing Sidebar Setup**
```bash
# Check if dashboard sidebar components exist
ls apps/web/components/dashboard/
ls packages/ui/src/components/sidebar*
```

**2. Create Dashboard Sidebar Component**

File: `apps/web/components/dashboard/app-sidebar.tsx`

Requirements:
- Use `Sidebar`, `SidebarContent`, `SidebarGroup` from `@lovico/ui/components/sidebar`
- Use `Button` from `@lovico/ui/components/button`
- Use icons from `lucide-react`
- Integrate with Better Auth: `import { authClient } from '@lovico/auth/client'`
- Use tRPC to fetch projects: `import { trpc } from '@/trpc/client'`

Structure:
```typescript
<Sidebar>
  <SidebarHeader>
    {/* Logo + Brand */}
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup>
      {/* "New Project" button */}
    </SidebarGroup>

    <SidebarGroup>
      {/* Recent Projects list (scrollable) */}
      {/* Each project: name, last modified, preview icon */}
    </SidebarGroup>

    <SidebarGroup>
      {/* Navigation: Dashboard, Projects, Templates, Settings */}
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
    {/* User profile: avatar, name, email */}
    {/* Logout button */}
  </SidebarFooter>
</Sidebar>
```

**3. Create Sidebar Trigger Component**

File: `apps/web/components/dashboard/sidebar-trigger.tsx`

- Mobile: Show hamburger icon that opens drawer
- Desktop: Toggle button that collapses/expands sidebar
- Use `useSidebar()` hook for state management
- Smooth transitions

**4. Update Dashboard Layout**

File: `apps/web/app/dashboard/layout.tsx`

Requirements:
- Wrap children with `SidebarProvider`
- Include `<AppSidebar />` component
- Add `<SidebarTrigger />` in header
- Responsive: drawer on mobile (<768px), persistent on desktop
- Preserve existing auth checks

Example structure:
```typescript
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              {/* Other header content */}
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
```

**5. Create tRPC Router for Projects (if not exists)**

File: `packages/trpc/src/routers/project.ts`

Add queries:
- `getRecentProjects` - Returns user's last 10 projects
- `createProject` - Creates new project

Ensure router is added to `packages/trpc/src/routers/_app.ts`

**6. Style Refinements**

- Use existing OKLch theme variables
- Ensure sidebar matches theme (light/dark mode)
- Smooth transitions for collapse/expand
- Active state styling for current project/nav item
- Hover states with `hover:bg-sidebar-accent`

### Acceptance Criteria

- [ ] Sidebar toggles between collapsed (icon only) and expanded states
- [ ] "New Project" button creates project via tRPC and navigates to it
- [ ] Recent projects list shows last 10 projects (scrollable)
- [ ] Clicking project navigates to `/dashboard/[projectId]`
- [ ] Navigation items highlight active route
- [ ] User profile shows session.user.name and session.user.email
- [ ] Logout button calls `authClient.signOut()` and redirects to login
- [ ] Mobile: sidebar becomes drawer, triggered by hamburger menu
- [ ] No console errors or TypeScript errors
- [ ] Sidebar persists collapsed state in localStorage

### Testing Steps

1. Run `bun dev:web` and navigate to `/dashboard`
2. Toggle sidebar - verify smooth animation
3. Click "New Project" - verify project creation and navigation
4. Click different nav items - verify active state changes
5. Test on mobile viewport (<768px) - verify drawer behavior
6. Test logout - verify redirect to login
7. Refresh page - verify collapsed state persists

### Additional Notes

- If tRPC project router doesn't exist, create basic CRUD operations
- Use optimistic updates for better UX (TanStack Query)
- Add loading skeletons for project list
- Handle empty state ("No projects yet")
- Consider adding project search/filter if >10 projects

---

## 🎯 PROMPT 2: AI SDK Elements Integration for Chat Interface

**Role**: Senior AI/UX Engineer with expertise in Vercel AI SDK, real-time streaming, and conversational interfaces

**Objective**: Replace custom chat components with AI SDK Elements (https://ai-sdk.dev/elements/) to leverage optimized, streaming-ready components for the chat interface.

### Context

We currently have custom chat components (`prompt-input.tsx`, `web-preview.tsx`) but AI SDK Elements provides battle-tested components optimized for LLM streaming, built on shadcn/ui. This reduces maintenance and improves performance.

**AI SDK Elements to Use:**
- `<ConversationMessages />` - Message list with streaming support
- `<PromptInput />` - Enhanced prompt input (replaces custom)
- `<WebPreview />` - Preview panel for generated sites
- `<Message />` - Individual message component

### Current State

- Custom `prompt-input.tsx` (1348 lines) with file attachments, speech recognition
- Custom `web-preview.tsx` (264 lines) with console panel
- Dashboard at `apps/web/app/dashboard/[id]/dashboard-client.tsx` uses resizable panels
- No real LLM integration yet (placeholder handlers)

### Implementation Requirements

**1. Install AI SDK Elements**

```bash
cd apps/web
bun add ai @ai-sdk/ui-react @ai-sdk/anthropic
```

**2. Create AI SDK Configuration**

File: `apps/web/lib/ai/config.ts`

```typescript
import { createAnthropic } from '@ai-sdk/anthropic'

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const defaultModel = 'claude-3-5-sonnet-20241022'
```

**3. Create AI Chat Route Handler**

File: `apps/web/app/api/chat/route.ts`

Requirements:
- Use AI SDK's `streamText()` for streaming responses
- Accept messages array and user context
- Return streaming response
- Handle file attachments from prompt input
- Error handling with proper HTTP status codes

Example structure:
```typescript
import { streamText } from 'ai'
import { anthropic, defaultModel } from '@/lib/ai/config'

export async function POST(req: Request) {
  const { messages, projectId } = await req.json()

  // Verify auth (Better Auth session)
  const session = await getSession(req)
  if (!session) return new Response('Unauthorized', { status: 401 })

  const result = await streamText({
    model: anthropic(defaultModel),
    messages,
    system: 'You are an expert web developer assistant...',
    // ... additional config
  })

  return result.toDataStreamResponse()
}
```

**4. Replace Chat Interface with AI SDK Elements**

File: `apps/web/components/chat/chat-interface.tsx`

Requirements:
- Use `useChat()` hook from `ai/react`
- Replace custom prompt-input with AI SDK's `<PromptInput />`
- Use `<ConversationMessages />` for message list
- Preserve file attachment functionality
- Integrate with resizable panels
- Add loading states (message streaming indicator)

Structure:
```typescript
'use client'
import { useChat } from 'ai/react'
import { ConversationMessages, PromptInput } from '@ai-sdk/ui-react'

export function ChatInterface({ projectId }: { projectId: string }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { projectId },
  })

  return (
    <div className="flex flex-col h-full">
      <ConversationMessages
        messages={messages}
        isLoading={isLoading}
      />
      <PromptInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        placeholder="Describe the website you want to build..."
        disabled={isLoading}
      />
    </div>
  )
}
```

**5. Enhance Prompt Input with File Attachments**

File: `apps/web/components/chat/enhanced-prompt-input.tsx`

Requirements:
- Extend AI SDK's `<PromptInput />` with file attachment UI
- Support drag-drop, paste, file picker (preserve existing logic from custom component)
- Visual preview for attached files
- Use `FileUIPart` type from AI SDK
- Model selector dropdown (Claude Sonnet, Opus, Haiku)

**6. Create Message Components with Code Blocks**

File: `apps/web/components/chat/message.tsx`

Requirements:
- Extend AI SDK's `<Message />` component
- Render markdown with syntax highlighting (`react-markdown` + `rehype-highlight`)
- Special handling for code blocks (show language, copy button)
- Support for artifact rendering (generated HTML/CSS/JS)

**7. Update Dashboard Client**

File: `apps/web/app/dashboard/[id]/dashboard-client.tsx`

Requirements:
- Replace custom chat components with new `<ChatInterface />`
- Keep resizable panels structure
- Add `<WebPreview />` from AI SDK for preview panel
- Sync chat context with preview (when code is generated, update preview)

Structure:
```typescript
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={40} minSize={30}>
    <ChatInterface projectId={projectId} />
  </ResizablePanel>

  <ResizableHandle />

  <ResizablePanel defaultSize={60} minSize={40}>
    <WebPreview projectId={projectId} />
  </ResizablePanel>
</ResizablePanelGroup>
```

**8. Add Message Persistence**

File: `packages/trpc/src/routers/message.ts`

Requirements:
- `saveMessage` mutation (stores user/assistant messages)
- `getMessages` query (fetches conversation history)
- Link messages to projects and users
- Update Prisma schema if needed

Prisma schema addition:
```prisma
model Message {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  role      String   // "user" | "assistant"
  content   String   @db.Text
  createdAt DateTime @default(now())
}
```

Run: `bun db:generate && bun db:migrate`

### Acceptance Criteria

- [ ] Chat interface uses AI SDK Elements components
- [ ] Messages stream in real-time (visible typing effect)
- [ ] File attachments work (drag-drop, paste, picker)
- [ ] Code blocks have syntax highlighting and copy button
- [ ] Model selector allows switching between Claude models
- [ ] Conversation history persists to database via tRPC
- [ ] Loading states show when AI is generating response
- [ ] Preview panel updates when code is generated
- [ ] No TypeScript errors or console warnings
- [ ] Responsive on mobile (stacked layout)

### Testing Steps

1. Navigate to `/dashboard/[projectId]`
2. Type prompt and submit - verify streaming response
3. Attach file (image/PDF) - verify preview and submission
4. Switch Claude model - verify different model is used
5. Generate HTML code - verify preview panel updates
6. Refresh page - verify conversation history loads
7. Test on mobile - verify responsive layout
8. Check database - verify messages are saved

### Additional Notes

- Add rate limiting to `/api/chat` route (protect against abuse)
- Implement token counting for usage tracking
- Add error recovery (retry failed messages)
- Consider adding "regenerate response" button
- Use Suspense boundaries for loading states

---

## 🎯 PROMPT 3: File Tree with Read-Only Code Viewer

**Role**: Senior Frontend Engineer with expertise in code editors, file trees, and syntax highlighting

**Objective**: Create a file tree component with read-only code viewer, similar to shadcn's block-viewer.tsx. Display generated code files in a navigable tree structure with syntax-highlighted preview.

### Context

When the LLM generates a website, it returns multiple files (HTML, CSS, JS, config files). We need a component to:
1. Display files in a tree structure (collapsible folders)
2. Show file content in a read-only code viewer
3. Syntax highlight based on file type
4. Support copying code to clipboard
5. No editing capability (preview only)

**Reference**: https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/block-viewer.tsx

### Current State

- File tree visualization exists at `apps/web/components/file-tree.tsx` (used in current dashboard)
- No code viewer component yet
- Resizable panels already implemented
- Theme supports code syntax highlighting colors

### Implementation Requirements

**1. Install Syntax Highlighting Dependencies**

```bash
cd apps/web
bun add shiki@^1.0.0 react-markdown remark-gfm rehype-highlight
```

**2. Create File Tree Data Structure**

File: `apps/web/lib/file-tree/types.ts`

```typescript
export type FileNode = {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string // Full path (e.g., "src/components/Button.tsx")
  content?: string // File content (only for type: 'file')
  children?: FileNode[] // Subdirectories/files (only for type: 'folder')
  language?: string // File language for syntax highlighting
}

export type FileTree = FileNode[]
```

**3. Create File Tree Component**

File: `apps/web/components/code-viewer/file-tree.tsx`

Requirements:
- Use `Collapsible` from `@lovico/ui/components/collapsible`
- Use `ScrollArea` from `@lovico/ui/components/scroll-area`
- Icons: `lucide-react` (Folder, File, ChevronRight, ChevronDown)
- Recursive rendering for nested folders
- Click handler to select file (emits `onFileSelect(file: FileNode)`)
- Visual indication of selected file
- Smooth expand/collapse animations

Structure:
```typescript
interface FileTreeProps {
  tree: FileTree
  selectedFile?: FileNode
  onFileSelect: (file: FileNode) => void
}

export function FileTree({ tree, selectedFile, onFileSelect }: FileTreeProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-1">
        {tree.map(node => (
          <TreeNode
            key={node.id}
            node={node}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

function TreeNode({ node, selectedFile, onFileSelect }: TreeNodeProps) {
  if (node.type === 'folder') {
    return (
      <Collapsible>
        <CollapsibleTrigger>
          {/* Folder icon + name */}
        </CollapsibleTrigger>
        <CollapsibleContent>
          {node.children?.map(child => (
            <TreeNode key={child.id} node={child} ... />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <button
      onClick={() => onFileSelect(node)}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md w-full text-left",
        selectedFile?.id === node.id && "bg-accent text-accent-foreground"
      )}
    >
      {/* File icon + name */}
    </button>
  )
}
```

**4. Create Code Viewer Component**

File: `apps/web/components/code-viewer/code-viewer.tsx`

Requirements:
- Use `shiki` for syntax highlighting
- Read-only (no editing, no cursor)
- Line numbers
- Copy button (copies entire file content)
- Language badge (top-right corner)
- Dark/light theme aware (use theme from context)

Structure:
```typescript
import { codeToHtml } from 'shiki'

interface CodeViewerProps {
  file: FileNode
}

export function CodeViewer({ file }: CodeViewerProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    // Generate syntax-highlighted HTML
    codeToHtml(file.content || '', {
      lang: file.language || 'plaintext',
      theme: 'github-dark', // Or theme-aware selection
    }).then(setHtml)
  }, [file])

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{file.name}</span>
          <Badge variant="secondary">{file.language}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigator.clipboard.writeText(file.content || '')}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="p-4 text-sm font-mono"
        />
      </ScrollArea>
    </div>
  )
}
```

**5. Create Combined File Explorer Component**

File: `apps/web/components/code-viewer/file-explorer.tsx`

Requirements:
- Resizable panels: file tree (left) + code viewer (right)
- State management for selected file
- Empty state when no file selected ("Select a file to preview")
- Responsive: stack vertically on mobile

Structure:
```typescript
export function FileExplorer({ tree }: { tree: FileTree }) {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <FileTree
          tree={tree}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
        />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={70} minSize={60}>
        {selectedFile ? (
          <CodeViewer file={selectedFile} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a file to preview
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

**6. Integrate with Chat Interface**

File: `apps/web/app/dashboard/[id]/dashboard-client.tsx`

Requirements:
- Add third panel for file explorer
- Layout: Chat (left) | File Explorer (middle) | Web Preview (right)
- Parse LLM responses for generated files (extract code blocks)
- Build FileTree from LLM response
- Update file explorer when new code is generated

Structure:
```typescript
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30}>
    <ChatInterface />
  </ResizablePanel>

  <ResizableHandle />

  <ResizablePanel defaultSize={35}>
    <FileExplorer tree={fileTree} />
  </ResizablePanel>

  <ResizableHandle />

  <ResizablePanel defaultSize={35}>
    <WebPreview />
  </ResizablePanel>
</ResizablePanelGroup>
```

**7. Create LLM Response Parser**

File: `apps/web/lib/file-tree/parser.ts`

Requirements:
- Parse markdown code blocks from LLM responses
- Extract file paths from code block metadata (e.g., ```html:index.html)
- Build FileTree structure from extracted files
- Detect language from file extension
- Handle nested folders

Example:
```typescript
export function parseFilesFromLLMResponse(markdown: string): FileTree {
  // Parse markdown, extract code blocks
  // Build FileNode[] with proper nesting
  // Return FileTree
}
```

**8. Add File Persistence**

File: `packages/trpc/src/routers/file.ts`

Requirements:
- `saveFiles` mutation (stores generated files)
- `getFiles` query (fetches files for project)
- Link to projects

Prisma schema:
```prisma
model File {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  path      String   // Full path (src/App.tsx)
  content   String   @db.Text
  language  String   // For syntax highlighting
  createdAt DateTime @default(now())
}
```

Run: `bun db:generate && bun db:migrate`

### Acceptance Criteria

- [ ] File tree displays nested folder structure
- [ ] Folders expand/collapse smoothly
- [ ] Clicking file shows content in code viewer
- [ ] Syntax highlighting works for common languages (HTML, CSS, JS, TS, JSON)
- [ ] Copy button copies file content to clipboard
- [ ] Selected file is visually highlighted in tree
- [ ] File tree is resizable (can adjust width)
- [ ] Read-only (no text editing possible)
- [ ] Theme-aware (dark/light mode)
- [ ] No console errors or TypeScript errors

### Testing Steps

1. Navigate to dashboard with project that has generated code
2. Verify file tree shows all files in proper structure
3. Click folder - verify expand/collapse animation
4. Click file - verify code appears in viewer with syntax highlighting
5. Click copy button - verify content copied to clipboard
6. Resize panels - verify smooth resizing
7. Switch theme - verify code viewer updates colors
8. Test on mobile - verify responsive layout

### Additional Notes

- Use virtual scrolling for large file trees (react-window)
- Add file search (filter files by name)
- Add "expand all" / "collapse all" buttons
- Consider adding breadcrumb navigation for deep folders
- Add file size indicators for large files

---

## 🎯 PROMPT 4: UI Polish & Visual Refinements

**Role**: Senior Design Engineer with expertise in UI/UX, accessibility, micro-interactions, and modern web design

**Objective**: Polish the dashboard and chat interface to match the visual quality of reference images. Focus on spacing, typography, colors, animations, loading states, and accessibility.

### Context

The functional components are now in place. This final step ensures the UI is production-ready with:
- Consistent spacing and typography
- Smooth animations and transitions
- Loading states and skeleton screens
- Error states with helpful messages
- Accessibility (ARIA labels, keyboard navigation)
- Mobile responsiveness
- Performance optimizations

### Current State

- All main components built (sidebar, chat, file explorer, preview)
- OKLch theme system in place
- Tailwind CSS v4 with custom utilities
- Motion (Framer Motion) available for animations
- shadcn components provide base accessibility

### Implementation Requirements

**1. Audit Current Spacing & Typography**

Review all new components:
- Consistent padding/margin scale (use Tailwind spacing scale)
- Typography hierarchy (heading sizes, line heights)
- Button sizes and padding
- Icon sizes relative to text
- Border radius consistency

**2. Enhance Loading States**

File: `apps/web/components/ui/skeleton-loader.tsx`

Requirements:
- Create skeleton loaders for:
  - Sidebar project list (3-5 items)
  - Chat messages (2-3 message bubbles)
  - File tree (nested structure)
  - Code viewer (lines of code)
- Use `Skeleton` component from `@lovico/ui/components/skeleton`
- Animate with pulse effect
- Match actual component dimensions

**3. Add Micro-Animations**

Use `motion` (Framer Motion) for:
- Sidebar collapse/expand (smooth width transition)
- Message appearance (fade in + slide up)
- File selection (highlight pulse)
- Button hover states (scale 1.05)
- Panel resize (smooth transition)

Example:
```typescript
import { motion } from 'motion/react'

<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
  {/* Message content */}
</motion.div>
```

**4. Improve Error States**

Create error components:
- Chat API errors: "Failed to send message. Retry?"
- File loading errors: "Unable to load file"
- Project creation errors: "Failed to create project"

Use `Alert` component from `@lovico/ui/components/alert`:
```typescript
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to send message. Please try again.
  </AlertDescription>
</Alert>
```

**5. Add Empty States**

Create empty state components:
- No projects yet: "Create your first project"
- No messages: "Start a conversation to build your website"
- No files generated: "Generate code to see file structure"

Use illustrations or icons with helpful copy and CTA button

**6. Accessibility Enhancements**

Requirements:
- Add ARIA labels to all interactive elements
- Keyboard navigation for file tree (arrow keys, enter)
- Focus visible styles (outline on keyboard focus)
- Screen reader announcements for chat messages
- Alt text for images and icons
- Color contrast ratio ≥4.5:1 (WCAG AA)

Example:
```typescript
<button
  aria-label="Toggle sidebar"
  aria-expanded={isExpanded}
  onClick={toggle}
>
  <Menu className="h-4 w-4" />
</button>
```

**7. Mobile Responsiveness**

Test and fix breakpoints:
- < 640px (mobile): Stack panels vertically
- 640px - 1024px (tablet): 2-column layout
- > 1024px (desktop): 3-panel layout

Add mobile-specific interactions:
- Swipe gestures for panel switching
- Bottom sheet for file explorer on mobile
- Larger touch targets (min 44x44px)

**8. Performance Optimizations**

Requirements:
- Lazy load syntax highlighter (`shiki`) - only load when file is selected
- Virtualize long lists (file tree with 100+ files)
- Debounce search inputs (300ms)
- Optimize re-renders with `React.memo()` for file tree nodes
- Use `useCallback()` and `useMemo()` where appropriate

Example:
```typescript
const TreeNode = React.memo(({ node, onSelect }: TreeNodeProps) => {
  // Component logic
})
```

**9. Add Keyboard Shortcuts**

File: `apps/web/lib/hooks/use-keyboard-shortcuts.ts`

Shortcuts:
- `Cmd+N` / `Ctrl+N`: New project
- `Cmd+K` / `Ctrl+K`: Command palette (future)
- `Cmd+B` / `Ctrl+B`: Toggle sidebar
- `Cmd+Enter` / `Ctrl+Enter`: Send message
- `Escape`: Close modals/drawers

Use `useEffect()` with event listeners:
```typescript
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = `${e.metaKey || e.ctrlKey ? 'Cmd+' : ''}${e.key}`
      shortcuts[key]?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcuts])
}
```

**10. Add Toast Notifications**

Use `sonner` (already installed) for feedback:
- "Project created successfully"
- "Message sent"
- "Code copied to clipboard"
- Error messages

File: `apps/web/components/ui/toast-notifications.tsx`

```typescript
import { toast } from 'sonner'

export function showSuccessToast(message: string) {
  toast.success(message, {
    duration: 3000,
    position: 'bottom-right',
  })
}

export function showErrorToast(message: string) {
  toast.error(message, {
    duration: 5000,
    position: 'bottom-right',
  })
}
```

**11. Polish Chat Interface**

Enhancements:
- User messages: right-aligned, primary color background
- Assistant messages: left-aligned, muted background
- Typing indicator (animated dots) while streaming
- Timestamp on hover
- Message actions (copy, regenerate) on hover
- Markdown rendering with proper spacing
- Code blocks with rounded corners and padding

**12. Polish File Explorer**

Enhancements:
- File type icons (different icons for .html, .css, .js, .json, etc.)
- File size display next to name
- Hover states on tree items (subtle background change)
- Smooth scroll to selected file
- Breadcrumb path above code viewer ("src > components > Button.tsx")

**13. Polish Web Preview**

Enhancements:
- Loading spinner while iframe loads
- Error boundary for iframe errors
- Reload button (refresh iframe)
- Responsive mode selector (mobile/tablet/desktop viewport sizes)
- Device frame around preview (optional)

**14. Add Onboarding Experience**

First-time user flow:
- Welcome modal with product tour
- Highlight key features (sidebar, chat, preview)
- "Create your first project" walkthrough
- Use `Dialog` from `@lovico/ui/components/dialog`

**15. Theme Refinements**

Review and adjust OKLch colors if needed:
- Ensure consistent contrast across components
- Verify dark mode looks good
- Add smooth theme transition (avoid flash)

File: `packages/ui/src/styles/globals.css`

Add transition:
```css
* {
  @apply transition-colors duration-200;
}
```

### Acceptance Criteria

- [ ] Consistent spacing across all components (Tailwind scale)
- [ ] Loading states show skeletons (not blank screens)
- [ ] Error states have helpful messages and retry actions
- [ ] Empty states guide users to take action
- [ ] Animations are smooth (60fps, no jank)
- [ ] Keyboard navigation works (tab, arrow keys)
- [ ] ARIA labels on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Mobile responsive (works on 375px viewport)
- [ ] Touch targets ≥44x44px on mobile
- [ ] No console errors or warnings
- [ ] Lighthouse score ≥90 (accessibility, performance)
- [ ] Dark mode looks polished
- [ ] Toast notifications show for actions

### Testing Steps

1. **Visual Audit**:
   - Compare to reference images
   - Check spacing consistency
   - Verify typography hierarchy

2. **Interaction Testing**:
   - Test all animations (sidebar, messages, panels)
   - Verify hover states on all interactive elements
   - Test keyboard shortcuts

3. **Accessibility Testing**:
   - Use keyboard only (no mouse)
   - Test with screen reader (VoiceOver/NVDA)
   - Verify color contrast with browser tools

4. **Responsive Testing**:
   - Test on mobile (iPhone SE, iPhone 14, iPad)
   - Test on desktop (1920x1080, 2560x1440)
   - Verify all breakpoints work

5. **Performance Testing**:
   - Run Lighthouse audit
   - Check React DevTools Profiler
   - Verify no unnecessary re-renders

6. **Error Testing**:
   - Trigger API errors (disconnect network)
   - Verify error states show properly
   - Test recovery flows

### Additional Notes

- Use `React.Suspense` for lazy-loaded components
- Add `loading="lazy"` to images
- Consider adding a command palette (Cmd+K) for power users
- Add analytics events for key actions (project created, message sent)
- Consider A/B testing different layouts

---

## 📋 Execution Order

Run prompts sequentially:
1. **PROMPT 1** → Dashboard Sidebar Navigation
2. **PROMPT 2** → AI SDK Elements Integration
3. **PROMPT 3** → File Tree with Code Viewer
4. **PROMPT 4** → UI Polish & Visual Refinements

Each prompt is self-contained with full context and can be executed by an agent independently.

## 🎯 Success Metrics

After completing all prompts:
- Dashboard loads in <2s (First Contentful Paint)
- Chat messages stream smoothly (no lag)
- File tree handles 100+ files without performance issues
- Lighthouse accessibility score ≥90
- Zero TypeScript errors
- Zero console warnings
- Mobile usable (touch targets, responsive)
- Dark mode fully functional

---

**Notes for Agents:**
- Follow the CLAUDE.md guidelines (use Bun, ESM only, tRPC patterns)
- Use existing components from `packages/ui` (don't duplicate)
- Maintain OKLch theme consistency
- Test on both light and dark modes
- Add TypeScript types for all props
- Use Zod for validation where appropriate
- Follow existing code style and patterns
