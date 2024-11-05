'use client'

import { useActionState, useEffect } from 'react'
import { signOut } from '@/app/login/actions'
import { toast } from 'sonner'
import { LoaderCircle, LogOut, Calendar, ClipboardCheck, Home } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import Link from 'next/link'

export default function AuthenticatedNav () {
  const [{ message }, formAction, isPending] = useActionState(signOut, { message: '', success: false })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <div className="flex items-center space-x-4">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard" className="text-gray-600 hover:text-teal-600" aria-label="Tareas">
              <Home className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
            Panel principal
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard/tasks" className="text-gray-600 hover:text-teal-600" aria-label="Tareas">
              <ClipboardCheck className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
            Tareas
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard" className="text-gray-600 hover:text-teal-600" aria-label="Horario">
              <Calendar className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
            Horario
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="h-6 w-px bg-gray-300" aria-hidden="true" />

      <form action={formAction} className="flex items-center">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="text-gray-600 hover:text-red-600"
                type="submit"
                aria-label="Cerrar sesión"
                disabled={isPending}
              >
                {isPending ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <LogOut className="h-5 w-5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-red-800">
              Cerrar sesión
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </div>
  )
}
