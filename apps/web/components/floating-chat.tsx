'use client'
import React from 'react'

import { motion } from 'motion/react'
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
} from '@/components/ai-elements/prompt-input'
export const FloatingChat = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-background/80 pointer-events-auto rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
    >
      <PromptInput onSubmit={() => {}} className="border-0 bg-transparent">
        <PromptInputBody>
          <PromptInputTextarea placeholder="Describe your project..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent />
            </PromptInputActionMenu>
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
    </motion.div>
  )
}
