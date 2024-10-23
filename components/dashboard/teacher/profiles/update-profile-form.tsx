'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/app/teacher/users/actions'
import { useToastContext } from '@/contexts/toast-context'
import { type Profile } from '@/types/custom'
import { useRouter } from 'next/navigation'

export default function UpdateProfileForm ({ profile }: { profile: Profile }) {
  const [name, setName] = useState(profile.name ?? '')
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToastContext()
  const router = useRouter()

  useEffect(() => {
    setName(profile.name ?? '')
  }, [profile.name])

  async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const updatedProfile = { ...profile, name }
    const result = await updateProfile(updatedProfile)

    setIsLoading(false)

    if (result?.error) {
      showToast({ type: 'error', message: result.error })
    } else if (result?.success) {
      showToast({ type: 'success', message: result.success })
      router.refresh()
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          value={name}
          disabled={isLoading}
          onChange={(e) => { setName(e.target.value) }}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Actualizando...' : 'Actualizar nombre'}
      </Button>
    </form>
  )
}
