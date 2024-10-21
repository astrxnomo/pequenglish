// components/dashboard/teacher/tasks/task-list.tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ServerToast } from '@/components/server-toast'

export default async function TaskList () {
  const supabase = createClient()

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select()

  if (tasksError) {
    return <ServerToast error="Tasks error" />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.length > 0
        ? (
            tasks.map((task) => (
          <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{task.title}</span>
                  {task.is_done
                    ? (
                    <CheckCircle2 className="text-green-500" />
                      )
                    : (
                    <Clock className="text-yellow-500" />
                      )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Fecha límite: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date available'}
                </p>
              </CardContent>
            </Card>
          </Link>
            ))
          )
        : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">No hay tareas pendientes.</CardContent>
        </Card>
          )}
    </div>
  )
}
