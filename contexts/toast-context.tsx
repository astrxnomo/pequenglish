'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ToastMessage {
  type: 'success' | 'error'
  title?: string
  message: string
  variant?: 'default' | 'destructive'
}

interface ToastContextType {
  showToast: (toast: ToastMessage) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider ({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null)

  const showToast = useCallback((newToast: ToastMessage) => {
    setToastMessage(newToast)
  }, [])

  React.useEffect(() => {
    if (toastMessage) {
      toast({
        title: toastMessage.title ?? (toastMessage.type === 'success' ? 'Success' : 'Error'),
        description: toastMessage.message,
        variant: toastMessage.variant ?? (toastMessage.type === 'success' ? 'default' : 'destructive')
      })
      setToastMessage(null)
    }
  }, [toastMessage, toast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToastContext () {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}
