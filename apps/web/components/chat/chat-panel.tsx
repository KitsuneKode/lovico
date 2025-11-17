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
    <div className="h-full flex flex-col bg-[#1a1a1a] border-l border-white/[0.08]">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-base font-semibold text-white truncate">{projectName}</span>
          <ChevronDown className="h-4 w-4 text-neutral-400 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200">
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6 py-6">
        <div className="space-y-6">
          {/* User Message */}
          <div className="flex flex-col items-end space-y-3">
            <div className="text-base text-white text-right max-w-[90%] px-5 py-3.5 rounded-xl border border-white/[0.12] bg-transparent shadow-sm">
              create a booking system for appointments with calendar integration
            </div>
            <button className="text-sm text-neutral-500 hover:text-neutral-400 flex items-center gap-1.5 transition-colors duration-200">
              <RotateCcw className="h-3.5 w-3.5" />
              Rollback to message
            </button>
          </div>

          {/* Logo/Divider */}
          <div className="flex justify-center py-4">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-lg">
              L
            </div>
          </div>

          {/* Activity Log */}
          <div className="space-y-2">
            {mockActivities.map((activity) => (
              <ActivityLogItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-white/[0.08] p-6 space-y-4">
        {/* Add Context Button */}
        <button className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-200">
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
            className="resize-none bg-white/[0.05] border-white/[0.12] text-white placeholder:text-neutral-500 pr-4 pb-14 min-h-[100px] text-base leading-relaxed focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
            rows={3}
          />

          {/* Bottom Controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            {/* Model Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs bg-white/[0.08] border border-white/[0.12] text-neutral-300 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                {selectedModel}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSend}
                size="icon"
                disabled={!input.trim()}
                className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all duration-200"
              >
                <Send className="h-4 w-4" />
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
        return <Sparkles className="h-4.5 w-4.5 text-purple-400" />
      case 'directory':
        return <Folder className="h-4.5 w-4.5 text-blue-400" />
      case 'file':
        return <FileText className="h-4.5 w-4.5 text-yellow-400" />
      case 'cancelled':
        return <CheckCircle2 className="h-4.5 w-4.5 text-green-400" />
      case 'success':
        return <CheckCircle2 className="h-4.5 w-4.5 text-green-400" />
      default:
        return <FileText className="h-4.5 w-4.5 text-neutral-400" />
    }
  }

  return (
    <div className="group flex items-start gap-3 hover:bg-white/[0.05] rounded-lg p-3 -mx-3 transition-all duration-200 cursor-pointer">
      <div className="mt-0.5 flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm text-white font-medium">{activity.message}</span>
          {activity.details && (
            <span className="text-xs text-neutral-500">{activity.details}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {activity.type !== 'cancelled' && (
          <ChevronRight className="h-4 w-4 text-neutral-600" />
        )}
      </div>
    </div>
  )
}
