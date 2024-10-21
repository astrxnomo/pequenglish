'use server'

import { createClient } from '@/utils/supabase/server'

export async function createUser (formData: FormData) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not authenticated' }
  }

  const { data: userRole, error: userRoleError } = await supabase
    .from('users_role')
    .select('user_id, role')
    .eq('user_id', user.id)
    .single()

  if (userRoleError) {
    return { error: 'Error retrieving role' }
  }

  if (userRole.role !== 'teacher') {
    return { error: 'Only teachers can create new users' }
  }

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
