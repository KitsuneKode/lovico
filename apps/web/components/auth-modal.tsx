'use client'

import { X } from 'lucide-react'
import { AuthForm } from './auth-form'
import { useRouter } from 'next/navigation'
import { Button } from '@lovico/ui/components/button'

interface AuthModalProps {
  mode: 'login' | 'signup'
}

export function AuthModal({ mode }: AuthModalProps) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-card relative w-full max-w-md rounded-xl border p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleClose}
        >
          <X className="size-4" />
        </Button>

        <AuthForm mode={mode} onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
