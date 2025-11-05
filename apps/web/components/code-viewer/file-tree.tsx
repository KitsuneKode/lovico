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
    <div className="h-full flex flex-col bg-[#1a1a1a] border-r border-white/5">
      {/* Search Bar */}
      <div className="p-3 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 h-8 text-xs focus-visible:ring-1 focus-visible:ring-white/20"
          />
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
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
  const paddingLeft = `${depth * 12 + 8}px`

  return (
    <>
      <button
        onClick={isFolder ? onToggle : onSelect}
        className={cn(
          'w-full flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors',
          isSelected && 'bg-white/10 text-white',
          !isSelected && 'text-neutral-300 hover:bg-white/5 hover:text-white'
        )}
        style={{ paddingLeft }}
      >
        {isFolder ? (
          <>
            {isExpanded ? (
              <ChevronDown className="h-3 w-3 text-neutral-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-3 w-3 text-neutral-400 flex-shrink-0" />
            )}
            <Folder className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
          </>
        ) : (
          <div className="w-3 flex-shrink-0" /> // Spacer for alignment
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

  return <File className={cn('h-3.5 w-3.5 flex-shrink-0', config.color)} />
}
