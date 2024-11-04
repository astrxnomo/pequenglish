import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import Link from 'next/link'
import EditProfileForm from '@/components/dashboard/teacher/profiles/edit-profile-form'
import { createClient } from '@/utils/supabase/server'
import { type Profile } from '@/types/custom'
import BackButton from '@/components/back-button'

export default async function Page ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const supabase = await createClient()
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
