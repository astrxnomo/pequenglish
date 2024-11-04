'use client'
import { useActionState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/app/login/actions'
import { toast } from 'sonner'

export default function LoginForm () {
  const [{ message }, formAction, isPending] = useActionState(login, { success: false, message: '' })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Log in'}
      </Button>
    </form>
  )
}
