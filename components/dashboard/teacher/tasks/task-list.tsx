'use client'

import { useEffect, useState } from 'react'
import TaskItem from './task-item'
import { type Task } from '@/types/custom'
import { ServerToast } from '@/components/server-toast'
import { TaskListSkeleton } from './task-list-skeleton'
import { createClient } from '@/utils/supabase/client'

export default function TaskListClient () {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      const supabase = createClient()
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select()
        .order('due_date', { ascending: true })

      if (error) {
        setError('Error loading tasks')
      } else {
        setTasks(tasks)
      }

      setLoading(false)
    }

    fetchTasks()
  }, [])

  if (loading) return <TaskListSkeleton />
  if (error) return <ServerToast error={error}/>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks?.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
