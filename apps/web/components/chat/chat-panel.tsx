'use client'

import { useState } from 'react'
import {
  Send,
  Paperclip,
  Settings,
  ChevronDown,
  Plus,
  Clock,
  Sparkles,
  Folder,
  FileText,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import { Button } from '@lovico/ui/components/button'
import { ScrollArea } from '@lovico/ui/components/scroll-area'
import { Textarea } from '@lovico/ui/components/textarea'
import { cn } from '@lovico/ui/lib/utils'

interface ChatPanelProps {
  projectId: string
  projectName?: string
}

interface ActivityItem {
  id: string
  type: 'started' | 'directory' | 'file' | 'cancelled' | 'success' | 'error'
  message: string
  details?: string
  timestamp?: string
}

export function ChatPanel({ projectId, projectName = 'Untitled Project' }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [selectedModel, setSelectedModel] = useState('claude-3-sonnet')

  // TODO: Replace with real message history from tRPC
  // const { data: messages } = trpc.message.getByProject.useQuery({ projectId })
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'started',
      message: 'Started appointment-booking',
      details: 'with nextjs-shadcn',
    },
    {
      id: '2',
      type: 'directory',
      message: 'Listed directory',
      details: 'appointment-booking (23 items)',
    },
    {
      id: '3',
      type: 'file',
      message: 'Read package.json',
      details: '(1-200)',
    },
    {
      id: '4',
      type: 'file',
      message: 'Read layout.tsx',
      details: '(1-400)',
    },
    {
      id: '5',
      type: 'cancelled',
      message: 'Read file cancelled',
    },
  ]

  const handleSend = () => {
    if (!input.trim()) return

    // TODO: Send message to backend
    // const mutation = trpc.message.send.useMutation()
    // mutation.mutate({ projectId, content: input, model: selectedModel })

    console.log('Sending:', input, 'with model:', selectedModel)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm font-medium text-white truncate">{projectName}</span>
          <ChevronDown className="h-4 w-4 text-neutral-400 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {/* User Message */}
          <div className="flex flex-col items-end space-y-2">
            <div className="text-sm text-white text-right max-w-[85%] px-4 py-2.5 rounded-xl border border-white/10 bg-transparent">
              create a booking system for appointments with calendar integration
            </div>
            <button className="text-xs text-neutral-500 hover:text-neutral-400 flex items-center gap-1 transition-colors">
              <RotateCcw className="h-3 w-3" />
              Rollback to message
            </button>
          </div>

          {/* Logo/Divider */}
          <div className="flex justify-center py-3">
            <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center text-xs font-semibold text-white shadow-sm">
              L
            </div>
          </div>

          {/* Activity Log */}
          <div className="space-y-3">
            {mockActivities.map((activity) => (
              <ActivityLogItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-white/5 p-4 space-y-3">
        {/* Add Context Button */}
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-md transition-colors">
          <Paperclip className="h-4 w-4" />
          Add context
        </button>

        {/* Prompt Input */}
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell Lovico what you want"
            className="resize-none bg-white/5 border-white/10 text-white placeholder:text-neutral-500 pr-4 pb-12 min-h-[80px] text-sm"
            rows={3}
          />

          {/* Bottom Controls */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            {/* Model Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                {selectedModel}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-neutral-400 hover:text-white"
              >
                <Settings className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-neutral-400 hover:text-white"
              >
                <Paperclip className="h-3.5 w-3.5" />
              </Button>
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!input.trim()}
                className="h-7 w-7 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ActivityLogItemProps {
  activity: ActivityItem
}

function ActivityLogItem({ activity }: ActivityLogItemProps) {
  const getIcon = () => {
    switch (activity.type) {
      case 'started':
        return <Sparkles className="h-4 w-4 text-purple-400" />
      case 'directory':
        return <Folder className="h-4 w-4 text-blue-400" />
      case 'file':
        return <FileText className="h-4 w-4 text-yellow-400" />
      case 'cancelled':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      default:
        return <FileText className="h-4 w-4 text-neutral-400" />
    }
  }

  return (
    <div className="group flex items-start gap-2.5 hover:bg-white/[0.03] rounded-md p-2 -mx-2 transition-colors cursor-pointer">
      <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[13px] text-white">{activity.message}</span>
          {activity.details && (
            <span className="text-[11px] text-neutral-500">{activity.details}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {activity.type !== 'cancelled' && (
          <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
        )}
      </div>
    </div>
  )
}
