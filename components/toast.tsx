'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToastContext } from '@/contexts/toast-context'

interface ServerToastProps {
  error?: string
  success?: string
  redirect?: string
  title?: string
  variant?: 'default' | 'destructive'
}

export function Toast ({
  error,
  success,
  redirect,
  title,
  variant = 'default'
}: ServerToastProps) {
  const { showToast } = useToastContext()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        title: title ?? 'Error',
        message: error,
        variant: 'destructive'
      })
    } else if (success) {
      showToast({
        type: 'success',
        title: title ?? 'Success',
        message: success,
        variant
      })
    }

    if (redirect) {
      router.push(redirect)
    }
  }, [error, success, redirect, title, variant, showToast, router])

  return null
}
