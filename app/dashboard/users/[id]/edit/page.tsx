import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import Link from 'next/link'
import EditProfileForm from '@/components/dashboard/profiles/edit-profile-form'
import { createClient } from '@/utils/supabase/server'
import { type Profile } from '@/types/custom'
import BackButton from '@/components/back-button'
import { redirect } from 'next/navigation'

export default async function EditProfilePage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: roleData, error: roleError } = await supabase
    .from('users_role')
    .select('user_id, role')
    .eq('user_id', user.id)
    .single()

  if (roleError) {
    redirect('/login')
  }

  if (roleData.role !== 'teacher') {
    redirect('/dashboard')
  }

  const id = (await params).id

  const { data: profile, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    return (
        <div className="flex flex-col gap-2">
        <Link href="/dashboard">
          <BackButton/>
        </Link>
        <Card className="mx-auto max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl">Error</CardTitle>
            <CardDescription>
                {error.message}
            </CardDescription>
            </CardHeader>
        </Card>
        </div>
    )
  }

  return (

      <div className="flex flex-col gap-2">
        <Link href="/dashboard">
          <BackButton/>
        </Link>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Editar usuario</CardTitle>
            <CardDescription>
              Ingresa el email y contraseña del usuario a crear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditProfileForm profile={profile as Profile} />
          </CardContent>
        </Card>
      </div>
  )
}
