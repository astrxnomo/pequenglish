import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import CreateUserForm from '@/components/dashboard/profiles/create-user-form'
import Link from 'next/link'
import BackButton from '@/components/back-button'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function CreateProfilePage () {
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

  return (
      <div className="flex flex-col gap-2">
        <Link href="/dashboard">
          <BackButton/>
        </Link>

        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Crear usuario</CardTitle>
            <CardDescription>
              Ingresa el email y contraseña del usuario a crear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateUserForm />
          </CardContent>
        </Card>
      </div>
  )
}
