import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { createClient } from '@/utils/supabase/server'
import { Toast } from '@/components/toast'
import { UserList } from '@/components/dashboard/teacher/users/user-list'

export default async function TeacherPage () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <Toast error="No user authenticated" redirect="/login" />
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
    return <Toast error="Role error" redirect="/" />
  } else if (role.role !== 'teacher') {
    return <Toast error="Only teachers can access this page" redirect="/" />
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas Pendientes</h2>
          <Link href="/dashboard/tasks/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Crear Tarea
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
              <Plus className="mr-2 h-4 w-4" /> Crear clase
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Usuarios</h2>

        <UserList profiles={profiles || []} />
      </section>
    </div>
  )
}
