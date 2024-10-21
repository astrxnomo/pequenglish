'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { emailLogin } from '@/app/login/actions'
import { useToastContext } from '@/contexts/toast-context'

export default function LoginForm () {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToastContext()
  const router = useRouter()

  async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await emailLogin(formData)

    setIsLoading(false)

    if (result?.error) {
      showToast({ type: 'error', message: result.error })
    } else if (result?.success) {
      showToast({ type: 'success', message: result.success })
    }
    router.push('/todos')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log in'}
      </Button>
    </form>
  )
}
