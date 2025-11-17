'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, File, Folder, Search } from 'lucide-react'
import { Input } from '@lovico/ui/components/input'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { cn } from '@lovico/ui/lib/utils'
import type { FileNode } from '@lovico/common'

interface FileTreeProps {
  files: FileNode[]
  selectedFile?: FileNode | null
  onFileSelect: (file: FileNode) => void
}

export function FileTree({ files, selectedFile, onFileSelect }: FileTreeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(['']))

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedPaths(newExpanded)
  }

  // Filter files based on search query
  const filteredFiles = searchQuery
    ? files.filter((node) => node.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : files

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-r border-white/[0.08]">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/[0.08]">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="pl-9 bg-white/[0.05] border-white/[0.12] text-white placeholder:text-neutral-500 h-9 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {filteredFiles.map((node) => (
            <FileTreeNode
              key={node.id}
              node={node}
              depth={0}
              isExpanded={expandedPaths.has(node.path)}
              isSelected={selectedFile?.id === node.id}
              onToggle={() => toggleExpand(node.path)}
              onSelect={() => {
                if (node.type === 'file') {
                  onFileSelect(node)
                }
              }}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

interface FileTreeNodeProps {
  node: FileNode
  depth: number
  isExpanded: boolean
  isSelected: boolean
  onToggle: () => void
  onSelect: () => void
  expandedPaths: Set<string>
  toggleExpand: (path: string) => void
}

function FileTreeNode({
  node,
  depth,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
  expandedPaths,
  toggleExpand,
}: FileTreeNodeProps) {
  const isFolder = node.type === 'directory'
  const paddingLeft = `${depth * 16 + 12}px`

  return (
    <>
      <button
        onClick={isFolder ? onToggle : onSelect}
        className={cn(
          'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200',
          isSelected && 'bg-white/[0.12] text-white font-medium',
          !isSelected && 'text-neutral-300 hover:bg-white/[0.08] hover:text-white'
        )}
        style={{ paddingLeft }}
      >
        {isFolder ? (
          <>
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-neutral-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-neutral-400 flex-shrink-0" />
            )}
            <Folder className="h-4 w-4 text-blue-400 flex-shrink-0" />
          </>
        ) : (
          <div className="w-3.5 flex-shrink-0" /> // Spacer for alignment
        )}

        {!isFolder && <FileIcon name={node.name} />}

        <span className="flex-1 text-left truncate">{node.name}</span>
      </button>

      {isFolder && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              isExpanded={expandedPaths.has(child.path)}
              isSelected={isSelected}
              onToggle={() => toggleExpand(child.path)}
              onSelect={onSelect}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </>
  )
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split('.').pop()?.toLowerCase()

  const iconConfig: Record<string, { color: string }> = {
    tsx: { color: 'text-blue-400' },
    ts: { color: 'text-blue-500' },
    jsx: { color: 'text-yellow-400' },
    js: { color: 'text-yellow-500' },
    css: { color: 'text-pink-400' },
    scss: { color: 'text-pink-500' },
    json: { color: 'text-green-400' },
    md: { color: 'text-purple-400' },
    html: { color: 'text-orange-400' },
    svg: { color: 'text-yellow-300' },
    png: { color: 'text-purple-300' },
    jpg: { color: 'text-purple-300' },
    jpeg: { color: 'text-purple-300' },
    webp: { color: 'text-purple-300' },
  }

  const config = iconConfig[ext || ''] || { color: 'text-neutral-400' }

  return <File className={cn('h-4 w-4 flex-shrink-0', config.color)} />
}
