'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProfile (
  prevState: {
    message: string
    success: boolean
  },
  formData: FormData
) {
  const supabase = await createClient({ isAdmin: true })

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { message: 'Both email and password are required', success: false }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { message: 'Invalid email address', success: false }
  }

  if (password.length < 6) {
    return { message: 'Password must be at least 6 characters long', success: false }
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    return { message: error.message, success: false }
  }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateProfile (
  id: string,
  prevState: {
    message: string
    success: boolean
  },
  formData: FormData
) {
  const supabase = await createClient()

  const name = formData.get('name') as string

  if (!id || !name) {
    return { message: 'ID and name are required', success: false }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ name })
    .eq('id', id)

  if (error) {
    return { message: error.message, success: false }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
