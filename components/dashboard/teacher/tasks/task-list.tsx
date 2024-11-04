// 'use client'

// import { useEffect, useState } from 'react'
import { cache } from 'react'
import TaskItem from './task-item'
import { createClient } from '@/utils/supabase/server'
import { type Task } from '@/types/custom'

const fetchTasks = cache(async () => {
  const supabase = await createClient()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*, profiles(name)')
    .order('due_date', { ascending: false })
  return tasks as Task[]
})

export default async function TaskList ({ isTeacher }: { isTeacher: boolean }) {
  const tasks = await fetchTasks()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.length
        ? (
            tasks.map(task => (
          <TaskItem key={task.id} task={task} isTeacher={isTeacher} />
            ))
          )
        : (
        <div className="text-center">No hay tareas</div>
          )}
    </div>
  )
}
