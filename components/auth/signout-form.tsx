// signout-form.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  message: '',
  success: false
}

function SignOutButton () {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}

export default function SignOutForm () {
  const [state, formAction] = useFormState(signOut, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive'
      })
    }
  }, [state, toast])

  return (
    <form action={formAction}>
      <SignOutButton />
    </form>
  )
}
