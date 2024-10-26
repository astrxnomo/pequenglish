import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import TaskList from '@/components/dashboard/teacher/tasks/task-list'
export default async function TeacherPage () {
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
          <TaskList isTeacher={true} count={0} />
      </section>
    </div>
  )
}
