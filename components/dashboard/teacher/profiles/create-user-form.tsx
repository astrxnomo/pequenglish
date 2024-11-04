'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createProfile } from '@/app/teacher/users/actions'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

export default function CreateUserForm () {
  const [{ message }, formAction, isPending] = useActionState(createProfile, { success: false, message: '' })

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
        {isPending ? 'Creating user...' : 'Create User'}
      </Button>
    </form>
  )
}
