'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createProfile } from '@/app/teacher/users/actions'
import { useToastContext } from '@/contexts/toast-context'

export default function CreateUserForm () {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToastContext()

  async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await createProfile(formData)

    setIsLoading(false)

    if (result?.error) {
      showToast({ type: 'error', message: result.error })
    } else if (result?.success) {
      showToast({ type: 'success', message: result.success })
    }
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
        {isLoading ? 'Creating user...' : 'Create User'}
      </Button>
    </form>
  )
}
