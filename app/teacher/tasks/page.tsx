import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
import { Suspense } from 'react'
import { TaskListSkeleton } from '@/components/dashboard/teacher/tasks/task-list-skeleton'

export default async function TasksPage () {
  const taskCount = 6

  return (
    <div className="space-y-10">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Tareas</h2>

          <div className='flex gap-2'>
            <Link href="/teacher">
              <Button variant='outline'>
                <ArrowLeft/>
                Volver
              </Button>
            </Link>
            <Link href="/teacher/tasks/create">
              <Button>
                <Plus/>
                Crear tarea
              </Button>
            </Link>
          </div>
        </div>
        <Suspense fallback={<TaskListSkeleton count={taskCount}/>}>
          <TaskList isTeacher={true} count={taskCount} />
        </Suspense>
      </section>
    </div>
  )
}
