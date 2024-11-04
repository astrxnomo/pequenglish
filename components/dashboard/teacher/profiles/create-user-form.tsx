'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { createProfile } from '@/app/teacher/users/actions'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Mail, TriangleAlert, Lock, LoaderCircle } from 'lucide-react'

export default function CreateUserForm () {
  const [{ message }, formAction, isPending] = useActionState(createProfile, { success: false, message: '' })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Correo electronico</Label>
        <div className="relative">
          <Input id="email" name="email" type="email" placeholder="example@domain.com" required/>
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input id="password" name="password" type="password" placeholder='••••••••'required />
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Lock size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>
      {message && (
        <Badge variant="destructive" className="flex items-center gap-2 rounded-md bg-red-100 text-red-800">
          <TriangleAlert className="h-4 w-4" />
          <span>{message}</span>
        </Badge>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <LoaderCircle className='animate-spin'/> : 'Crear usuario'}
      </Button>
    </form>
  )
}
