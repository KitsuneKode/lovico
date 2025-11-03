'use client'

import { cn } from '@lovico/ui/lib/utils'
import { useState, useEffect } from 'react'
import { Button } from '@lovico/ui/components/button'
import { SendHorizonal, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface ExpandablePromptInputProps {
  onSubmit?: (prompt: string) => void
  className?: string
}

export function ExpandablePromptInput({
  onSubmit,
  className,
}: ExpandablePromptInputProps) {
  const [value, setValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const EXPANSION_THRESHOLD = 20

  useEffect(() => {
    if (value.length >= EXPANSION_THRESHOLD && !isExpanded) {
      setIsExpanded(true)
    }
  }, [value.length, isExpanded])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      if (onSubmit) {
        onSubmit(value.trim())
      } else {
        // Default behavior: redirect to dashboard with prompt
        window.location.href = `/dashboard/new?prompt=${encodeURIComponent(value.trim())}`
      }
      setValue('')
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      className={cn('w-full max-w-2xl', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          layout
          className={cn(
            'bg-card/80 relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-500',
            isExpanded && 'shadow-primary/20',
          )}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-muted/50 flex items-center gap-2 border-b px-4 py-2"
              >
                <Sparkles className="text-primary size-4" />
                <span className="text-sm font-medium">
                  Creating your website...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-center gap-2 p-4">
            <motion.textarea
              layout
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe the website you want to build..."
              rows={isExpanded ? 4 : 1}
              className={cn(
                'placeholder:text-muted-foreground flex-1 resize-none bg-transparent pr-12 font-medium transition-all outline-none',
                isExpanded && 'text-sm',
              )}
            />

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-4 bottom-4"
                >
                  <Button
                    type="submit"
                    size="icon"
                    className="size-10 rounded-xl shadow-lg transition-transform hover:scale-105"
                    disabled={!value.trim()}
                  >
                    <SendHorizonal className="size-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {!isExpanded && (
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="size-8 shrink-0 opacity-0 transition-opacity hover:opacity-100"
                disabled={!value.trim()}
              >
                <SendHorizonal className="size-4" />
              </Button>
            )}
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-muted/30 text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-xs"
            >
              <span>Press Enter to submit</span>
              <span>{value.length} characters</span>
            </motion.div>
          )}
        </motion.div>

        {!isExpanded && value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-muted-foreground mt-2 text-center text-xs"
          >
            {EXPANSION_THRESHOLD - value.length} more characters to expand
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
