'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'
import { useToastContext } from '@/contexts/toast-context'

export default function SignOutForm () {
  const router = useRouter()
  const { showToast } = useToastContext()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const result = await signOut()

    if (result?.error) {
      showToast({ type: 'error', message: result.error })
    } else if (result?.success) {
      showToast({ type: 'success', message: result.success })
    }
    router.push('/')

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Button type="submit" disabled={loading}>
        Sign Out
      </Button>
    </form>
  )
}
