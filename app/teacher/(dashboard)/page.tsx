import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { createClient } from '@/utils/supabase/server'
import { ServerToast } from '@/components/server-toast'
import ScheduleTable from '@/components/dashboard/teacher/classes/schedule-table'
import ProfileList from '@/components/dashboard/teacher/profiles/profile-list'
import { redirect } from 'next/navigation'

export default async function TeacherPage () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

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
          <h2 className="text-3xl font-bold">Tareas</h2>
          <Link href="/teacher/tasks">
            <Button>
              <Settings/>
              Gestionar tareas
            </Button>
          </Link>
        </div>
          <TaskList isTeacher={true} count={3}/>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Horario</h2>
          <Link href="/teacher/classes/create">
            <Button>
              <Settings/>
              Gestionar clases
            </Button>
          </Link>
        </div>

        <ScheduleTable />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Usuarios</h2>
          <Link href="/teacher/users/create">
            <Button>
              <Plus/>
              Crear usuario
            </Button>
          </Link>
        </div>
        <ProfileList/>
      </section>
    </div>
  )
}
