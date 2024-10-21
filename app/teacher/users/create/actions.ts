'use server'

import { createClient } from '@/utils/supabase/server'

export async function createUser (formData: FormData) {
  const supabase = createClient({ isAdmin: true })

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Both email and password are required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email address' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long' }
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'User created successfully' }
}
