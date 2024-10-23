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

export async function updateUser (profileId: string, data: { name: string }) {
  const supabase = createClient({ isAdmin: true })

  if (!profileId || !data.name) {
    return { error: 'Profile ID and name are required' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ name: data.name })
    .eq('id', profileId)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Profile updated successfully' }
}
