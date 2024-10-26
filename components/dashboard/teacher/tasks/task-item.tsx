import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { type Task } from '@/types/custom'
import { Calendar, Pencil, Trash, User } from 'lucide-react'
import Link from 'next/link'
import { formatRelativeDate } from '@/utils/format-relative-date'
import { Button } from '@/components/ui/button'
import { deleteTask } from '@/app/teacher/tasks/actions'

export default function TaskItem ({ task, isTeacher }: { task: Task, isTeacher: boolean }) {
  const statusColor = task.is_done ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  const isPastDue = task.due_date ? new Date(task.due_date) < new Date() : false
  const formattedDate = task.due_date ? formatRelativeDate(task.due_date) : 'Sin fecha'

  return (
    <Link href={`/teacher/tasks/${task.id}`}>
      <Card className="transition-shadow hover:shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="flex bg-gray-50 p-3 rounded-t-lg">
          <CardTitle className="flex justify-between items-center text-lg font-semibold text-primary">
            <span className="mr-2 whitespace-nowrap overflow-hidden text-ellipsis">{task.title}</span>

            {isTeacher && (
              <div className="flex gap-1">
                <Link href={`/teacher/tasks/${task.id}/edit`}>
                  <Button className="px-2 py-1 rounded-md bg-slate-100 text-primary hover:bg-slate-200" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="px-2 py-1 rounded-md font-medium bg-red-50 text-red-800 hover:bg-red-100"
                  formAction={async () => {
                    await deleteTask(task.id)
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardTitle>

        </CardHeader>
        <CardContent className="p-4 flex justify-between items-center text-sm">
          <div className="flex flex-col text-gray-500">
            {isTeacher && (
              <div className='flex items-center'>
                <User className="w-4 h-4 mr-1" aria-hidden="true" />
                <span>{task.profiles.name}</span>
              </div>
            )}
            <div className={`flex items-center ${isPastDue ? 'text-red-700' : ''}`}>
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <p className={`px-2 py-1 rounded-md font-medium ${statusColor}`}>
            {task.is_done ? 'Completada' : 'Pendiente'}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
