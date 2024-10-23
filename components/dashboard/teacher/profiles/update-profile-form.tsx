'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateUser } from '@/app/teacher/actions'
import { useToastContext } from '@/contexts/toast-context'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdateProfileForm ({ profileId }: { profileId: string }) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToastContext()
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()

      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', profileId)
        .single()

      if (profile) {
        setName(profile.name || '')
      }
    }

    fetchProfile()
  }, [profileId])

  async function onSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const result = await updateUser(profileId, { name })

    setIsLoading(false)

    if (result?.error) {
      showToast({ type: 'error', message: result.error })
    } else if (result?.success) {
      showToast({ type: 'success', message: result.success })
      router.push('/teacher')
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
