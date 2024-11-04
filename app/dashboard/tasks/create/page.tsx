import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import BackButton from '@/components/back-button'
import CreateTaskForm from '@/components/dashboard/tasks/create-task-form'
import { type Profile } from '@/types/custom'
import { redirect } from 'next/navigation'

export default async function CreateTaskPage () {
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

  const { data: students } = await supabase
    .from('profiles')
    .select('id, name, users_role!inner(role)')
    .eq('users_role.role', 'student')

  return (
    <div className="container mx-auto my-10 flex flex-col gap-2">
      <Link href="/dashboard/tasks">
        <BackButton/>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Crear Nueva Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateTaskForm students={students as Profile[]}/>
        </CardContent>
      </Card>
    </div>
  )
}
