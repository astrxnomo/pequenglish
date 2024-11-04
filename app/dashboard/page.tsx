import ScheduleTable from '@/components/dashboard/classes/schedule-table'
import ProfileList from '@/components/dashboard/profiles/profile-list'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutGrid, Plus, Settings } from 'lucide-react'
import TaskList from '@/components/dashboard/tasks/task-list'
import { Suspense } from 'react'
import { TaskListSkeleton } from '@/components/dashboard/tasks/task-list-skeleton'
import { ProfileListSkeleton } from '@/components/dashboard/profiles/profile-list-skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage () {
  const taskLimit = 3
  let isTeacher = false

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: role } = await supabase
      .from('users_role')
      .select('user_id, role')
      .eq('user_id', user.id)
      .single()

    if (role?.role === 'teacher') {
      isTeacher = true
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-5xl space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas</h2>
            <Link href="/dashboard/tasks">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="aspect-square max-sm:p-0">
                    {isTeacher
                      ? (
                      <>
                        <Settings size={16} strokeWidth={2} aria-hidden="true" />
                        <span className="max-sm:sr-only">Gestionar tareas</span>
                      </>
                        )
                      : (
                      <>
                        <LayoutGrid size={16} strokeWidth={2} aria-hidden="true" />
                        <span className="max-sm:sr-only">Mis tareas</span>
                      </>
                        )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                  {isTeacher
                    ? 'Gestionar tareas'
                    : 'Ver todas mis tareas'
                  }
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>

        </div>
        <Suspense fallback={<TaskListSkeleton count={taskLimit}/>}>
          <TaskList isTeacher={isTeacher} count={taskLimit} />
        </Suspense>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Horario</h2>
          {isTeacher && (
            <Link href="/dashboard/classes/create">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="aspect-square max-sm:p-0">
                      <Settings size={16} strokeWidth={2} aria-hidden="true" />
                      <span className="max-sm:sr-only">Gestionar clases</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                    Gestionar todas las clases
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          )}
        </div>
        <ScheduleTable />
      </section>

      {isTeacher && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Usuarios</h2>

              <Link href="/dashboard/users/create">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="aspect-square max-sm:p-0">
                        <Plus size={16} strokeWidth={2} aria-hidden="true" />
                        <span className="max-sm:sr-only">Crear usuario</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                      Crear nuevos usuarios
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

          </div>
          <Suspense fallback={<ProfileListSkeleton/>}>
            <ProfileList/>
          </Suspense>
        </section>
      )}
    </div>
  )
}
