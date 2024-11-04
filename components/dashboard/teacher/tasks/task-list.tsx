import TaskItem from './task-item'
import { createClient } from '@/utils/supabase/server'
import { type Task } from '@/types/custom'
import { Card, CardContent } from '@/components/ui/card'

export default async function TaskList ({ isTeacher, count }: { isTeacher: boolean, count: number }) {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*, profiles(name)')
    .order('due_date', { ascending: false })
    .limit(count)

  return (
    <>
      {tasks?.length
        ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task as Task} isTeacher={isTeacher} />
            ))}
          </div>
          )
        : (
          <Card className='p-4 w-full'>
            <CardContent className="p-4 text-center text-gray-500">
              No hay tareas
            </CardContent>
          </Card>
          )}
    </>
  )
}
