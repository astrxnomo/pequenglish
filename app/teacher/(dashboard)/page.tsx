import ScheduleTable from '@/components/dashboard/teacher/classes/schedule-table'
import ProfileList from '@/components/dashboard/teacher/profiles/profile-list'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { Suspense } from 'react'
import { TaskListSkeleton } from '@/components/dashboard/teacher/tasks/task-list-skeleton'
import { ProfileListSkeleton } from '@/components/dashboard/teacher/profiles/profile-list-skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default async function TeacherPage () {
  const taskLimit = 3

  return (
    <div className="space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas</h2>
          <Link href="/teacher/tasks">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="aspect-square max-sm:p-0">
                    <Settings className="opacity-60 sm:-ms-1" size={16} strokeWidth={2} aria-hidden="true" />
                    <span className="max-sm:sr-only">Gestionar tareas</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                  Gestionar todas las tareas
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="aspect-square max-sm:p-0">
                    <Settings className="opacity-60 sm:-ms-1" size={16} strokeWidth={2} aria-hidden="true" />
                    <span className="max-sm:sr-only">Gestionar clases</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                  Gestionar todas las clases
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
        <ScheduleTable />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Usuarios</h2>
          <Link href="/teacher/users/create">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="aspect-square max-sm:p-0">
                    <Plus className="opacity-60 sm:-ms-1" size={16} strokeWidth={2} aria-hidden="true" />
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
    </div>
  )
}
