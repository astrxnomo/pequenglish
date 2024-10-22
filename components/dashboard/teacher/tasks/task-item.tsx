import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { type Task } from '@/types/custom'

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <Link href={`/dashboard/tasks/${task.id}`}>
      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {task.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{task.content}</p>
          <p>Due: {task.due_date}</p>
          <p>Status: {task.is_done ? 'Done' : 'Pending'}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TaskItem
