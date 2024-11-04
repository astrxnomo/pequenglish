import ScheduleTable from '@/components/dashboard/teacher/classes/schedule-table'
import ProfileList from '@/components/dashboard/teacher/profiles/profile-list'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { Suspense } from 'react'
import { TaskListSkeleton } from '@/components/dashboard/teacher/tasks/task-list-skeleton'
import { ProfileListSkeleton } from '@/components/dashboard/teacher/profiles/profile-list-skeleton'

export default async function TeacherPage () {
  const taskLimit = 3

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
        <Suspense fallback={<TaskListSkeleton count={taskLimit}/>}>
          <TaskList isTeacher={true} count={taskLimit} />
        </Suspense>
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
        <Suspense fallback={<ProfileListSkeleton/>}>
          <ProfileList/>
        </Suspense>
      </section>
    </div>
  )
}
