'use client'

import { z } from 'zod'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@lovico/ui/lib/utils'
import { useRouter } from 'next/navigation'
import { authClient } from '@lovico/auth/client'
import { Input } from '@lovico/ui/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@lovico/ui/components/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@lovico/ui/components/field'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSuccess?: () => void
  onToggle?: () => void
  className?: string
}

export function AuthForm({
  mode,
  onSuccess,
  onToggle,
  className,
}: AuthFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isLogin = mode === 'login'
  const schema = isLogin ? loginSchema : signupSchema

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    setError(null)
    setIsLoading(true)

    try {
      if (isLogin) {
        const { email, password } = data as LoginFormData
        const result = await authClient.signIn.email({
          email,
          password,
        })

        if (result.error) {
          setError(result.error.message || 'Invalid credentials')
          return
        }

        onSuccess?.()
        router.refresh()
      } else {
        const { name, email, password } = data as SignupFormData
        const result = await authClient.signUp.email({
          name,
          email,
          password,
        })

        if (result.error) {
          setError(result.error.message || 'Failed to create account')
          return
        }

        // Auto sign in after signup
        await authClient.signIn.email({ email, password })
        onSuccess?.()
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit(onSubmit as any)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            {isLogin
              ? 'Enter your credentials to sign in'
              : 'Fill in the form below to get started'}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-center text-sm">
            {error}
          </div>
        )}

        {!isLogin && (
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              disabled={isLoading}
            />
            {errors.name && (
              <FieldDescription className="text-destructive">
                {errors.name.message as string}
              </FieldDescription>
            )}
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && (
            <FieldDescription className="text-destructive">
              {errors.email.message as string}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {isLogin && (
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            disabled={isLoading}
          />
          {errors.password && (
            <FieldDescription className="text-destructive">
              {errors.password.message as string}
            </FieldDescription>
          )}
        </Field>

        {!isLogin && (
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <FieldDescription className="text-destructive">
                {errors.confirmPassword.message as string}
              </FieldDescription>
            )}
          </Field>
        )}

        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : isLogin ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" disabled={isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-4"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            <span className="ml-2">
              {isLogin ? 'Sign in' : 'Sign up'} with GitHub
            </span>
          </Button>

          <FieldDescription className="text-center">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={onToggle}
              className="hover:text-primary underline underline-offset-4"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
