'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/app/dashboard/users/actions'
import { toast } from 'sonner'
import { type Profile } from '@/types/custom'
import { LoaderCircle } from 'lucide-react'

export default function EditProfileForm ({ profile }: { profile: Profile }) {
  const updateProfileWithId = updateProfile.bind(null, profile.id)
  const [{ message }, formAction, isPending] = useActionState(updateProfileWithId, { success: false, message: '' })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

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
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <LoaderCircle className='animate-spin'/> : 'Actualizar'}
      </Button>
    </form>
  )
}
