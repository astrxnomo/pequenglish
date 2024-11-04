'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { TriangleAlert, LoaderCircle } from 'lucide-react'
import { createTask } from '@/app/dashboard/tasks/actions'
import { Textarea } from '@/components/ui/textarea'
import { type Profile } from '@/types/custom'
import { useActionState, useEffect } from 'react'

export default function CreateTaskForm ({ students }: { students: Profile[] }) {
  const [{ message }, formAction, isPending] = useActionState(createTask, { success: false, message: '' })

  useEffect(() => {
    if (message) {
      toast.error(message)
    }
  }, [message])

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">
          Título
        </Label>
        <Input id="title" name="title" type="text" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">
          Contenido
        </Label>
        <Textarea id="content" name="content" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dueDate">
          Fecha de Vencimiento
        </Label>
        <Input id="dueDate" name="due_date" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="student">
            Estudiante
        </Label>
        <select id="student" name="user_id" className="w-full px-3 py-2 border rounded" required>
            <option value="">Selecciona un estudiante</option>
            {students?.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
            ))}
        </select>
      </div>
      {message && (
        <Badge variant="destructive" className="flex items-center gap-2 rounded-md bg-red-100 text-red-800">
          <TriangleAlert className="h-4 w-4" />
          <span>{message}</span>
        </Badge>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <LoaderCircle className='animate-spin'/> : 'Crear Tarea'}
      </Button>
  </form>
  )
}
