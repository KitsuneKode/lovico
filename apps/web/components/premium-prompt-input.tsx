'use client'

import { cn } from '@lovico/ui/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@lovico/ui/components/button'
import { motion, AnimatePresence } from 'motion/react'
import { Wand2, Sparkles, ImagePlus, Paperclip, X } from 'lucide-react'

interface PremiumPromptInputProps {
  onSubmit?: (prompt: string, attachments?: File[]) => void
  className?: string
}

export function PremiumPromptInput({
  onSubmit,
  className,
}: PremiumPromptInputProps) {
  const [value, setValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
        onSubmit(value.trim(), attachments)
      } else {
        const encodedPrompt = encodeURIComponent(value.trim())
        window.location.href = '/dashboard/new?prompt=' + encodedPrompt
      }
      setValue('')
      setAttachments([])
      setIsExpanded(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments((prev) => [...prev, ...files])
    if (e.target) e.target.value = ''
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      className={cn('w-full max-w-3xl', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          multiple
          accept="image/*"
        />

        <motion.div
          layout
          className={cn(
            'group relative overflow-hidden transition-all duration-500',
            isExpanded
              ? 'from-card/95 to-card/80 shadow-primary/20 rounded-3xl border-2 bg-gradient-to-b shadow-2xl backdrop-blur-xl'
              : 'bg-card/60 rounded-full border shadow-lg backdrop-blur-md hover:shadow-xl',
            isFocused &&
              'ring-primary/50 ring-offset-background ring-2 ring-offset-2',
          )}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="border-border/50 from-primary/10 via-primary/5 border-b bg-gradient-to-r to-transparent px-6 py-3"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                  >
                    <Sparkles className="text-primary size-4" />
                  </motion.div>
                  <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-sm font-semibold text-transparent">
                    AI is ready to create
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              'relative flex items-center gap-3 transition-all',
              isExpanded ? 'px-6 py-4' : 'px-6 py-4',
            )}
          >
            <motion.div
              layout
              className="flex-shrink-0"
              animate={{
                scale: isFocused ? 1.1 : 1,
                rotate: isFocused ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="from-primary to-primary/70 shadow-primary/30 flex size-10 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                <Wand2 className="text-primary-foreground size-5" />
              </div>
            </motion.div>

            <motion.textarea
              layout
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={
                isExpanded
                  ? 'Describe your website in detail...'
                  : 'What do you want to build?'
              }
              rows={isExpanded ? 3 : 1}
              className={cn(
                'placeholder:text-muted-foreground/60 flex-1 resize-none bg-transparent font-medium transition-all outline-none',
                isExpanded ? 'text-base leading-relaxed' : 'text-sm',
              )}
            />

            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    className="hover:bg-primary/10 size-10 rounded-xl"
                  >
                    <ImagePlus className="size-5" />
                  </Button>

                  <Button
                    type="submit"
                    size="icon"
                    disabled={!value.trim()}
                    className="from-primary to-primary/80 shadow-primary/30 hover:shadow-primary/40 size-12 rounded-2xl bg-gradient-to-r shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Sparkles className="size-6" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: value.length > 0 ? 0.5 : 0 }}
                  className="flex-shrink-0"
                >
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    disabled={!value.trim()}
                    className="size-9 rounded-full"
                  >
                    <Sparkles className="size-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-border/30 border-t px-6 py-3"
              >
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="group/attachment bg-muted/50 relative flex items-center gap-2 rounded-xl border px-3 py-2"
                    >
                      <Paperclip className="text-muted-foreground size-3" />
                      <span className="max-w-[150px] truncate text-xs">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="hover:bg-destructive/20 rounded-full p-1 opacity-0 transition-opacity group-hover/attachment:opacity-100"
                      >
                        <X className="size-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-border/30 bg-muted/20 flex items-center justify-between border-t px-6 py-2.5"
            >
              <div className="text-muted-foreground flex items-center gap-4 text-xs">
                <span>Press Enter to submit</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  Shift + Enter for new line
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <motion.span
                  animate={{
                    color:
                      value.length > 200
                        ? 'rgb(239 68 68)'
                        : 'rgb(113 113 122)',
                  }}
                  className="font-medium tabular-nums"
                >
                  {value.length}
                </motion.span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">500</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {!isExpanded &&
          value.length > 0 &&
          value.length < EXPANSION_THRESHOLD && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center"
            >
              <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                <Sparkles className="size-3" />
                {EXPANSION_THRESHOLD - value.length} more to unlock full editor
              </span>
            </motion.div>
          )}
      </form>
    </motion.div>
  )
}
