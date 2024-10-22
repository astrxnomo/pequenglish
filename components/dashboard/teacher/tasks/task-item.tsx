import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { type Task } from '@/types/custom'
import { CheckCircle2, Clock, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const TaskItem = ({ task }: { task: Task }) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const getRelativeDay = (date: Date) => {
    const today = new Date()
    const diffDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoy'
    if (diffDays === 1) return 'Mañana'
    if (diffDays === -1) return 'Ayer'
    if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return capitalizeFirstLetter(format(date, 'eeee d', { locale: es })) // Day name and number
    }

    return capitalizeFirstLetter(format(date, 'P', { locale: es })) // Short date format
  }

  const formattedDate = task.due_date ? `Para el ${getRelativeDay(new Date(task.due_date))}` : 'Sin fecha'
  const statusColor = task.is_done ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'

  return (
    <Link href={`/dashboard/tasks/${task.id}`}>
      <Card className="transition-shadow hover:shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="flex bg-gray-50 p-4 rounded-t-lg">
          <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800 flex-grow overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="mr-2 overflow-hidden">{task.title}</span>
            <span className="flex-shrink-0 ml-2">
              {task.is_done
                ? (
                <CheckCircle2 className="text-green-500" />
                  )
                : (
                <Clock className="text-yellow-500" />
                  )}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedDate}
            </div>
            <p className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${statusColor}`}>
              {task.is_done ? 'Done' : 'Pending'}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TaskItem
