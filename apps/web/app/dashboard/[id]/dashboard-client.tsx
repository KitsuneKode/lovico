'use client'

import { useState } from 'react'
import { cn } from '@lovico/ui/lib/utils'
import { dummyProjects } from '@/lib/dummy-data'
import { CodeViewer } from '@/components/code-viewer'
import { Button } from '@lovico/ui/components/button'
import { Skeleton } from '@lovico/ui/components/skeleton'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { PromptInput } from '@/components/ai-elements/prompt-input'
import { Tabs, TabsList, TabsTrigger } from '@lovico/ui/components/tabs'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@lovico/ui/components/resizable'
import {
  Code2,
  Globe,
  Download,
  Share2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
} from 'lucide-react'
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
  WebPreviewConsole,
} from '@/components/ai-elements/web-preview'

interface DashboardClientProps {
  projectId: string
}

export function DashboardClient({ projectId }: DashboardClientProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([
    {
      role: 'assistant',
      content:
        "👋 Hi! I'm here to help you build your website. What would you like to create or modify?",
    },
  ])
  const [generatedUrl, setGeneratedUrl] = useState('')

  // Use dummy data for now (replace with tRPC when database is seeded)
  const project = dummyProjects.find((p) => p.id === projectId)
  const isLoadingProject = false

  const handlePromptSubmit = async (prompt: string, attachments: File[]) => {
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: prompt }])

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'll create that for you! Here's a preview of your website...",
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Top Bar */}
      <header className="bg-card flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          {isLoadingProject ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <>
              <h1 className="text-lg font-semibold">
                {project?.name || 'Untitled Project'}
              </h1>
              {project?.description && (
                <span className="text-muted-foreground text-sm">
                  {project.description}
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Play className="size-4" />
            Deploy
          </Button>
        </div>
      </header>

      {/* Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Preview/Code */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex h-full flex-col">
            {/* View Mode Tabs */}
            <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-2">
              <Tabs
                value={viewMode}
                onValueChange={(v) => setViewMode(v as 'preview' | 'code')}
              >
                <TabsList>
                  <TabsTrigger value="preview" className="gap-2">
                    <Globe className="size-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-2">
                    <Code2 className="size-4" />
                    Code
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {viewMode === 'preview' && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <RotateCw className="size-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              {isLoadingProject ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Skeleton className="mx-auto mb-4 h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              ) : viewMode === 'preview' ? (
                <WebPreview
                  defaultUrl={generatedUrl || 'about:blank'}
                  className="h-full"
                >
                  <WebPreviewNavigation>
                    <WebPreviewNavigationButton tooltip="Back">
                      <ChevronLeft className="size-4" />
                    </WebPreviewNavigationButton>
                    <WebPreviewNavigationButton tooltip="Forward">
                      <ChevronRight className="size-4" />
                    </WebPreviewNavigationButton>
                    <WebPreviewNavigationButton tooltip="Reload">
                      <RotateCw className="size-4" />
                    </WebPreviewNavigationButton>
                    <WebPreviewUrl />
                  </WebPreviewNavigation>

                  <WebPreviewBody />

                  <WebPreviewConsole
                    logs={[
                      {
                        level: 'log',
                        message: 'Website loaded successfully',
                        timestamp: new Date(),
                      },
                    ]}
                  />
                </WebPreview>
              ) : (
                <CodeViewer
                  files={[
                    {
                      name: 'index.html',
                      content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project?.name || 'My Website'}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to ${project?.name || 'My Website'}</h1>
        <p>This is a beautiful website generated by AI!</p>
        <p>Start chatting with the AI to modify and enhance your website.</p>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
                      language: 'html',
                    },
                    {
                      name: 'styles.css',
                      content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 600px;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}`,
                      language: 'css',
                    },
                    {
                      name: 'script.js',
                      content: `console.log('Website loaded successfully!');

// Add interactive functionality here
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Example: Add animation on load
  const container = document.querySelector('.container');
  if (container) {
    container.style.animation = 'fadeIn 0.5s ease-in';
  }
});

// Example animation keyframes (would normally be in CSS)
const style = document.createElement('style');
style.textContent = \`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
\`;
document.head.appendChild(style);`,
                      language: 'javascript',
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Chat */}
        <ResizablePanel defaultSize={40} minSize={25}>
          <div className="bg-muted/20 flex h-full flex-col">
            {/* Chat Header */}
            <div className="bg-card flex items-center gap-3 border-b px-6 py-4">
              <div className="from-primary to-primary/70 flex size-10 items-center justify-center rounded-full bg-gradient-to-br">
                <Sparkles className="text-primary-foreground size-5" />
              </div>
              <div>
                <h2 className="font-semibold">AI Assistant</h2>
                <p className="text-muted-foreground text-xs">
                  Describe changes or ask questions
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="from-primary to-primary/70 flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br">
                        <Sparkles className="text-primary-foreground size-4" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border',
                      )}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="bg-muted flex size-8 flex-shrink-0 items-center justify-center rounded-full">
                        <span className="text-xs font-semibold">You</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="bg-card border-t p-4">
              <PromptInput
                onSubmit={handlePromptSubmit}
                placeholder="Describe what you want to build or modify..."
                className="w-full"
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
