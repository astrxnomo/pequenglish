'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'

import { toast } from 'sonner'
import { LoaderCircle, LogOut } from 'lucide-react'

export default function SignOutForm () {
  const [{ message }, formAction, isPending] = useActionState(signOut, { message: '', success: false })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <form action={formAction}>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <LoaderCircle className='animate-spin'/> : <LogOut />}
      </Button>
    </form>
  )
}
