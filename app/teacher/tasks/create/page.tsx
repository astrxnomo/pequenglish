'use client'

import { useState, useEffect, useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { createTask } from '@/app/teacher/tasks/actions'
import { type Profile } from '@/types/custom'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function CreateTaskPage () {
  const [students, setStudents] = useState<Profile[]>([])
  const [{ message }, formAction, isPending] = useActionState(createTask, { success: false, message: '' })

  useEffect(() => {
    async function fetchStudents () {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, users_role!inner(role)')
        .eq('users_role.role', 'student')

      if (error) {
        toast.error(error.message)
      } else {
        setStudents(data as Profile[])
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <div className="container mx-auto my-10 flex flex-col gap-2">
      <Link href="/teacher/tasks">
        <Button variant="outline">
          <ArrowLeft/>
          Volver
        </Button>
      </Link>
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creando tarea...' : 'Crear Tarea'}
            </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
