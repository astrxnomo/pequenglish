'use server'

import { createClient } from '@/utils/supabase/server'
import { type Profile } from '@/types/custom'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProfile (formData: FormData) {
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

  return { success: 'Profile created successfully' }
}

export async function updateProfile (profile: Profile) {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user == null) {
    return { error: 'No user authenticated' }
  }

  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id)

  if (error) {
    return { error: error.message }
  }

  return { success: 'Profile updated successfully' }
}
