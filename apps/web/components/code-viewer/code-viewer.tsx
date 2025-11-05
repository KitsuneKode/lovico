'use client'

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'
import { Button } from '@lovico/ui/components/button'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { cn } from '@lovico/ui/lib/utils'
import type { FileNode } from '@lovico/common'

interface CodeViewerProps {
  file: FileNode
  onClose?: () => void
}

export function CodeViewer({ file, onClose }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (file.content) {
      await navigator.clipboard.writeText(file.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const lines = file.content?.split('\n') || []

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      {/* File Tab */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">{getFileDirectory(file.path)}</span>
          <span className="text-xs text-white font-medium">{file.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-xs text-neutral-400 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-7 w-7 text-neutral-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Code Content */}
      <ScrollArea className="flex-1">
        <div className="font-mono text-xs">
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex hover:bg-white/5 transition-colors"
            >
              <span className="inline-block w-12 text-right pr-4 text-neutral-600 select-none flex-shrink-0 border-r border-white/5">
                {i + 1}
              </span>
              <pre className="flex-1 text-neutral-200 px-4 py-0 m-0 overflow-visible">
                <code className={cn(getLanguageClass(file.language))}>{line || ' '}</code>
              </pre>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function getFileDirectory(path: string): string {
  const parts = path.split('/')
  parts.pop() // Remove filename
  return parts.join('/') || '/'
}

function getLanguageClass(language?: string): string {
  // Basic syntax highlighting classes (can be enhanced with shiki later)
  const languageClasses: Record<string, string> = {
    typescript: 'language-typescript',
    javascript: 'language-javascript',
    tsx: 'language-tsx',
    jsx: 'language-jsx',
    css: 'language-css',
    html: 'language-html',
    json: 'language-json',
    markdown: 'language-markdown',
  }

  return languageClasses[language || ''] || 'language-plaintext'
}

interface EmptyCodeViewerProps {
  message?: string
}

export function EmptyCodeViewer({ message = 'Select a file to preview' }: EmptyCodeViewerProps) {
  return (
    <div className="h-full flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <p className="text-sm text-neutral-500">{message}</p>
      </div>
    </div>
  )
}
