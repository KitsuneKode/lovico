'use client'

import { useState } from 'react'
import { cn } from '@lovico/ui/lib/utils'
import { Button } from '@lovico/ui/components/button'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  File,
  FolderOpen,
  Folder,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@lovico/ui/components/collapsible'

interface CodeFile {
  name: string
  content: string
  language: string
}

interface FileTreeItem {
  name: string
  type: 'file' | 'folder'
  children?: FileTreeItem[]
}

interface CodeViewerProps {
  files: CodeFile[]
  className?: string
}

export function CodeViewer({ files, className }: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState(files[0])
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  // Build file tree structure
  const fileTree: FileTreeItem[] = files.map((file) => ({
    name: file.name,
    type: 'file' as const,
  }))

  const handleCopy = async (content: string, fileName: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedFile(fileName)
    setTimeout(() => setCopiedFile(null), 2000)
  }

  return (
    <div className={cn('flex h-full overflow-hidden', className)}>
      {/* File Tree Sidebar */}
      <div className="bg-muted/20 w-64 shrink-0 border-r">
        <div className="bg-muted/50 border-b px-4 py-3">
          <h3 className="text-sm font-semibold">Files</h3>
        </div>
        <ScrollArea className="h-[calc(100%-53px)]">
          <div className="p-2">
            <FileTree
              items={fileTree}
              files={files}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          </div>
        </ScrollArea>
      </div>

      {/* Code Display */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedFile ? (
          <>
            {/* File Header */}
            <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-2">
              <div className="flex items-center gap-2">
                <File className="text-muted-foreground size-4" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-muted-foreground text-xs">
                  {selectedFile.language}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleCopy(selectedFile.content, selectedFile.name)
                }
                className="gap-2"
              >
                {copiedFile === selectedFile.name ? (
                  <>
                    <Check className="size-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Code Content */}
            <ScrollArea className="flex-1">
              <SyntaxHighlighter
                language={selectedFile.language}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
                codeTagProps={{
                  style: {
                    fontFamily:
                      'var(--font-geist-mono), ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
                  },
                }}
              >
                {selectedFile.content}
              </SyntaxHighlighter>
            </ScrollArea>
          </>
        ) : (
          <div className="text-muted-foreground flex h-full items-center justify-center">
            <div className="text-center">
              <File className="mx-auto mb-2 size-12 opacity-20" />
              <p className="text-sm">Select a file to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface FileTreeProps {
  items: FileTreeItem[]
  files: CodeFile[]
  selectedFile: CodeFile | undefined
  onSelectFile: (file: CodeFile) => void
  depth?: number
}

function FileTree({
  items,
  files,
  selectedFile,
  onSelectFile,
  depth = 0,
}: FileTreeProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <FileTreeNode
          key={item.name}
          item={item}
          files={files}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          depth={depth}
        />
      ))}
    </div>
  )
}

interface FileTreeNodeProps {
  item: FileTreeItem
  files: CodeFile[]
  selectedFile: CodeFile | undefined
  onSelectFile: (file: CodeFile) => void
  depth: number
}

function FileTreeNode({
  item,
  files,
  selectedFile,
  onSelectFile,
  depth,
}: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (item.type === 'folder') {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger
          className="hover:bg-muted/50 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <ChevronRight
            className={cn('size-4 transition-transform', isOpen && 'rotate-90')}
          />
          {isOpen ? (
            <FolderOpen className="size-4 text-blue-500" />
          ) : (
            <Folder className="size-4 text-blue-500" />
          )}
          <span>{item.name}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.children && (
            <FileTree
              items={item.children}
              files={files}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
              depth={depth + 1}
            />
          )}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  const file = files.find((f) => f.name === item.name)
  const isSelected = selectedFile?.name === item.name

  return (
    <button
      onClick={() => file && onSelectFile(file)}
      className={cn(
        'hover:bg-muted/50 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
        isSelected && 'bg-muted text-primary font-medium',
      )}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
    >
      <File
        className={cn(
          'size-4',
          isSelected ? 'text-primary' : 'text-muted-foreground',
        )}
      />
      <span className="truncate">{item.name}</span>
    </button>
  )
}
