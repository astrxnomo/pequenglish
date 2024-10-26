'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createTask (
  prevState: {
    message: string
    success: boolean
  },
  formData: FormData
) {
  const supabase = createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const dueDate = formData.get('due_date') as string
  const userId = formData.get('user_id') as string

  if (!title || !content || !userId) {
    return { message: 'Title, content, and student are required', success: false }
  }

  const { error } = await supabase
    .from('tasks')
    .insert([{ title, content, due_date: dueDate, is_done: false, user_id: userId }])

  if (error) {
    return { message: error.message, success: false }
  }

  revalidatePath('/teacher')
  redirect('/teacher')
}
