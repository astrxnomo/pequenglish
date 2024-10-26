'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { createTask } from '@/app/teacher/tasks/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { useToast } from '@/hooks/use-toast'
import { type Profile } from '@/types/custom'

const initialState = {
  message: '',
  success: false
}

function CreateTaskButton () {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Creando tarea...' : 'Crear Tarea'}
    </Button>
  )
}

export default function CreateTaskPage () {
  const [students, setStudents] = useState([] as Profile[])
  const [state, formAction] = useFormState(createTask, initialState)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchStudents () {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('profiles')
        .select(`
            id,
            name,
            users_role (
              role
            )
          `)

      console.log(data)
      if (error) {
        console.error('Error fetching students:', error)
      } else {
        setStudents(data)
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive'
      })
    }
  }, [state, toast])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nueva Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <Input id="title" name="title" type="text" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Contenido
              </label>
              <Textarea id="content" name="content" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Fecha de Vencimiento
              </label>
              <Input id="dueDate" name="due_date" type="date" />
            </div>
            <div className="space-y-2">
              <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                Estudiante
              </label>
              <select id="student" name="user_id" className="w-full px-3 py-2 border rounded" required>
                <option value="">Selecciona un estudiante</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
            <CardFooter>
              <CreateTaskButton />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
