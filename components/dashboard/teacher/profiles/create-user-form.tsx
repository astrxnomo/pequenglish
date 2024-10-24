// create-user-form.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createProfile } from '@/app/teacher/users/actions'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  message: '',
  success: false
}

function CreateUserButton () {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Creating user...' : 'Create User'}
    </Button>
  )
}

export default function CreateUserForm () {
  const [state, formAction] = useFormState(createProfile, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive'
      })
    }
  }, [state, toast])

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
      <CreateUserButton />
    </form>
  )
}
