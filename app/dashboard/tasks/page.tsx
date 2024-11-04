import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { Suspense } from 'react'
import { TaskListSkeleton } from '@/components/dashboard/teacher/tasks/task-list-skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import BackButton from '@/components/back-button'
import { createClient } from '@/utils/supabase/server'

export default async function TasksPage () {
  const taskCount = 6
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
    <div className="space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas</h2>

          <div className='flex gap-2'>
            <Link href="/dashboard">
              <BackButton/>
            </Link>
            {isTeacher && (
              <Link href="/dashboard/tasks/create">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" aria-label="Crear tarea">
                        <Plus size={16} strokeWidth={2} aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                      Crear tarea
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            )}
          </div>
        </div>
        <Suspense fallback={<TaskListSkeleton count={taskCount}/>}>
          <TaskList isTeacher={isTeacher} count={taskCount} />
        </Suspense>
      </section>
    </div>
  )
}
