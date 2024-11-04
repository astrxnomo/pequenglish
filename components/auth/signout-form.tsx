'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'

import { toast } from 'sonner'
import { LoaderCircle, LogOut } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export default function SignOutForm () {
  const [{ message }, formAction, isPending] = useActionState(signOut, { message: '', success: false })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <form action={formAction}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' className='hover:text-red-600' type="submit" size="icon" aria-label="Crear tarea" disabled={isPending}>
              {isPending ? <LoaderCircle className='animate-spin'/> : <LogOut />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
            Cerrar sesión
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  )
}
