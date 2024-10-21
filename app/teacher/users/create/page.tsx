import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'

import CreateUserForm from '@/components/auth/create-user-form'
import { createClient } from '@/utils/supabase/server'
import { ServerToast } from '@/components/server-toast'

export default async function CreateUser () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <ServerToast error="No user authenticated" redirect="/login" />
  }

  const { data: role, error: roleError } = await supabase
    .from('users_role')
    .select('user_id, role')
    .eq('user_id', user.id)
    .single()

  if (!role || roleError) {
    return <ServerToast error="Role error" redirect="/" />
  }

  if (role.role !== 'teacher') {
    return <ServerToast error="Only teachers can access this page" redirect="/" />
  }

  return (
    <section className="h-[calc(100vh-300px)] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create New User</CardTitle>
          <CardDescription>
            Create a new user account (Teacher only)
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CreateUserForm />
        </CardContent>
      </Card>
    </section>
  )
}
