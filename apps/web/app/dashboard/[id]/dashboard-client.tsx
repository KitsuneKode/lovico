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
      {/* Top Bar - Modern style */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex items-center gap-6">
          <h1 className="text-base font-semibold text-white">
            {project?.name || 'Untitled Project'}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('preview')}
              className={cn(
                'px-4 py-2 text-sm rounded-lg transition-all duration-200',
                viewMode === 'preview'
                  ? 'bg-white/[0.12] text-white font-medium'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              )}
            >
              <Globe className="inline h-4 w-4 mr-2" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={cn(
                'px-4 py-2 text-sm rounded-lg transition-all duration-200',
                viewMode === 'code'
                  ? 'bg-white/[0.12] text-white font-medium'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.08]'
              )}
            >
              <Code2 className="inline h-4 w-4 mr-2" />
              Code
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-9 px-4 text-sm bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/20 transition-all duration-200"
          >
            <Zap className="h-4 w-4 mr-2" />
            Pro
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Three-Panel Layout - Modern responsive design */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Tree Panel */}
        {viewMode === 'code' && (
          <>
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <FileTree
                files={mockFiles}
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
              />
            </ResizablePanel>

            <ResizableHandle className="w-px bg-white/[0.08] hover:bg-indigo-500/50 transition-colors duration-200" />
          </>
        )}

        {/* Preview/Code Panel */}
        <ResizablePanel defaultSize={viewMode === 'code' ? 48 : 65} minSize={35}>
          {viewMode === 'preview' ? (
            <div className="h-full flex items-center justify-center bg-white">
              <div className="text-center p-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-neutral-100 rounded-2xl flex items-center justify-center">
                  <Globe className="h-10 w-10 text-neutral-400" />
                </div>
                <p className="text-base text-neutral-700 font-semibold">Preview coming soon</p>
                <p className="text-sm text-neutral-500 mt-2 max-w-xs mx-auto">
                  Your generated website will appear here
                </p>
              </div>
            </div>
          ) : selectedFile ? (
            <CodeViewer file={selectedFile} />
          ) : (
            <EmptyCodeViewer message="Select a file to preview" />
          )}
        </ResizablePanel>

        <ResizableHandle className="w-px bg-white/[0.08] hover:bg-indigo-500/50 transition-colors duration-200" />

        {/* Chat Panel */}
        <ResizablePanel defaultSize={32} minSize={28} maxSize={40}>
          <ChatPanel projectId={projectId} projectName={project?.name} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
