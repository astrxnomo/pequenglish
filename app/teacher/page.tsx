import { createClient } from '@/utils/supabase/server'
import { ServerToast } from '@/components/server-toast'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { UserList } from '@/components/dashboard/teacher/users/user-list'
import TaskSection from '@/components/dashboard/teacher/tasks/task-section'
import { Suspense } from 'react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'

export default async function CreateUser () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return <ServerToast error="No user authenticated" redirect="/login" />
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('name, email')
    .eq('id', user.id)
    .single()

  if (!profile || profileError) {
    return <ServerToast error="Profile error" redirect="/" />
  }

  const { profiles, error: profilesError } = await supabase
    .from('profiles')
    .select()

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
    <div className="space-y-10">
      <header className="bg-gradient-to-r from-primary to-primary-foreground text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">
          Bienvenido, {profile?.name ?? profile?.email}
        </h1>
        <p className="text-xl mt-2">Panel de Profesor</p>
      </header>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas Pendientes</h2>
          <Link href="/dashboard/tasks/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Crear Tarea
            </Button>
          </Link>
        </div>

        <Suspense fallback={<div>Cargando...</div>}>
          <TaskList/>
        </Suspense>
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

        {/* <ScheduleTable classesMap={classesMap} isTeacher={true} /> */}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Usuarios</h2>

        <UserList profiles={profiles || []} />
      </section>
    </div>
  )
}
