// actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login (
  prevState: {
    message: string
    success: boolean
  },
  formData: FormData
) {
  const supabase = createClient()

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

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { message: error.message, success: false }
  }

  redirect('/teacher')
}

export async function signOut () {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { message: error.message, success: false }
  }

  redirect('/')
}
