'use client'

import { useState } from 'react'
import { Copy, Check, X, File } from 'lucide-react'
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
      <div className="h-14 flex items-center justify-between px-6 border-b border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-400">{getFileDirectory(file.path)}</span>
          <span className="text-sm text-white font-semibold">{file.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-3 text-sm text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-2 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-2" />
                Copy
              </>
            )}
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Code Content */}
      <ScrollArea className="flex-1">
        <div className="font-mono text-sm leading-6">
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex hover:bg-white/[0.05] transition-colors duration-150"
            >
              <span className="inline-block w-14 text-right pr-5 text-neutral-600 select-none flex-shrink-0 border-r border-white/[0.08] text-xs">
                {i + 1}
              </span>
              <pre className="flex-1 text-neutral-200 px-6 py-0 m-0 overflow-visible">
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
        <div className="w-16 h-16 mx-auto mb-4 bg-white/[0.05] rounded-xl flex items-center justify-center">
          <File className="h-8 w-8 text-neutral-600" />
        </div>
        <p className="text-base text-neutral-400 font-medium">{message}</p>
        <p className="text-sm text-neutral-600 mt-2">Click on a file from the tree to view its contents</p>
      </div>
    </div>
  )
}
