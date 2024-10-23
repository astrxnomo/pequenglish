import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { createClient } from '@/utils/supabase/server'
import { ServerToast } from '@/components/server-toast'
import { UserList } from '@/components/dashboard/teacher/users/user-list'
import CreateUserButton from '@/components/dashboard/teacher/users/create-user-button'

export default async function TeacherPage () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <ServerToast error="No user authenticated" redirect="/login" />
  }

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, user_id, full_name, email, avatar_url')

  const { data: role, error: roleError } = await supabase
    .from('users_role')
    .select('user_id, role')
    .eq('user_id', user.id)
    .single()

  if (!role || roleError) {
    return <ServerToast error="Role error" redirect="/" />
  } else if (role.role !== 'teacher') {
    return <ServerToast error="Only teachers can access this page" redirect="/" />
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas Pendientes</h2>
          <Link href="/dashboard/tasks/create">
            <Button>
              <Plus/>
              Crear Tarea
            </Button>
          </Link>
        </div>
          <TaskList />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Horario Semanal</h2>
          <Link href="/dashboard/classes/create">
            <Button>
              <Plus/>
              Crear clase
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Usuarios</h2>
          <CreateUserButton />
        </div>
        <UserList profiles={profiles || []} />
      </section>
    </div>
  )
}
