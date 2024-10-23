import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { type Task } from '@/types/custom'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { formatRelativeDate } from '@/utils/format-relative-date'

export default function TaskItem ({ task }: { task: Task }) {
  const statusColor = task.is_done ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  const formattedDate = task.due_date ? formatRelativeDate(task.due_date) : 'Sin fecha'

  return (
    <Link href={`/dashboard/tasks/${task.id}`}>
      <Card className="transition-shadow hover:shadow-lg rounded-lg border border-gray-200">
        <CardHeader className=" bg-gray-50 p-4 rounded-t-lg">
          <CardTitle className="text-lg font-semibold text-primary overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="mr-2 overflow-hidden">{task.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex justify-between items-center text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>
          <p className={`px-2 py-1 rounded-md font-medium ${statusColor}`}>
            {task.is_done ? 'Completada' : 'Pendiente'}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
