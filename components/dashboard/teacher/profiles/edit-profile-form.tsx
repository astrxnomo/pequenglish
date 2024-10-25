'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/app/teacher/users/actions'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { type Profile } from '@/types/custom'

const initialState = {
  message: '',
  success: false
}

function EditProfileButton () {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Actualizando...' : 'Actualizar'}
    </Button>
  )
}

export default function EditProfileForm ({ profile }: { profile: Profile }) {
  const updateProfileWithId = updateProfile.bind(null, profile.id)
  const [state, formAction] = useFormState(updateProfileWithId, initialState)
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
      <input type="hidden" name="id" value={profile.id} />
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          defaultValue={profile.name ?? ''}
          required
        />
      </div>
      <EditProfileButton />
    </form>
  )
}
