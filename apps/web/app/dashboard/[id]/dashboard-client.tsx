'use client'

import { useState } from 'react'
import { cn } from '@lovico/ui/lib/utils'
import { dummyProjects } from '@/lib/dummy-data'
import { FileTree } from '@/components/code-viewer/file-tree'
import { CodeViewer, EmptyCodeViewer } from '@/components/code-viewer/code-viewer'
import { ChatPanel } from '@/components/chat/chat-panel'
import { Button } from '@lovico/ui/components/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@lovico/ui/components/resizable'
import { Globe, Code2, Settings, Zap } from 'lucide-react'
import type { FileNode } from '@lovico/common'

interface DashboardClientProps {
  projectId: string
}

export function DashboardClient({ projectId }: DashboardClientProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('code')
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  // Use dummy data for now (replace with tRPC when database is seeded)
  const project = dummyProjects.find((p) => p.id === projectId)

  // TODO: Replace with real file tree from tRPC
  // const { data: fileTree } = trpc.file.getTree.useQuery({ projectId })
  const mockFiles: FileNode[] = [
    {
      id: '1',
      name: 'appointment-booking',
      type: 'directory',
      path: 'appointment-booking',
      isExpanded: true,
      children: [
        {
          id: '2',
          name: 'src',
          type: 'directory',
          path: 'appointment-booking/src',
          isExpanded: true,
          children: [
            {
              id: '3',
              name: 'app',
              type: 'directory',
              path: 'appointment-booking/src/app',
              children: [
                {
                  id: '4',
                  name: 'layout.tsx',
                  type: 'file',
                  path: 'appointment-booking/src/app/layout.tsx',
                  language: 'tsx',
                  content: `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Appointment Booking',
  description: 'Book appointments easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
                },
                {
                  id: '5',
                  name: 'page.tsx',
                  type: 'file',
                  path: 'appointment-booking/src/app/page.tsx',
                  language: 'tsx',
                  content: `export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Appointment Booking</h1>
      <p className="mt-4">Book your appointments easily</p>
    </main>
  )
}`,
                },
              ],
            },
          ],
        },
        {
          id: '6',
          name: 'package.json',
          type: 'file',
          path: 'appointment-booking/package.json',
          language: 'json',
          content: `{
  "name": "appointment-booking",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}`,
        },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar - same.dev style */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-medium text-white">
            {project?.name || 'Untitled Project'}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('preview')}
              className={cn(
                'px-3 py-1 text-xs rounded transition-colors',
                viewMode === 'preview'
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              <Globe className="inline h-3 w-3 mr-1" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={cn(
                'px-3 py-1 text-xs rounded transition-colors',
                viewMode === 'code'
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white'
              )}
            >
              <Code2 className="inline h-3 w-3 mr-1" />
              Code
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700"
          >
            <Zap className="h-3 w-3 mr-1" />
            Pro
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-neutral-400 hover:text-white"
          >
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </header>

      {/* Three-Panel Layout - same.dev style */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Tree Panel */}
        {viewMode === 'code' && (
          <>
            <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
              <FileTree
                files={mockFiles}
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
              />
            </ResizablePanel>

            <ResizableHandle className="w-px bg-white/5" />
          </>
        )}

        {/* Preview/Code Panel */}
        <ResizablePanel defaultSize={viewMode === 'code' ? 52 : 70} minSize={35}>
          {viewMode === 'preview' ? (
            <div className="h-full flex items-center justify-center bg-white">
              <div className="text-center p-8">
                <Globe className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                <p className="text-sm text-neutral-600">Preview coming soon</p>
                <p className="text-xs text-neutral-400 mt-2">
                  Generated website will appear here
                </p>
              </div>
            </div>
          ) : selectedFile ? (
            <CodeViewer file={selectedFile} />
          ) : (
            <EmptyCodeViewer message="Select a file to preview" />
          )}
        </ResizablePanel>

        <ResizableHandle className="w-px bg-white/5" />

        {/* Chat Panel */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <ChatPanel projectId={projectId} projectName={project?.name} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
