'use server'

import { createClient } from '@/utils/supabase/server'
import { type Profile } from '@/types/custom'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProfile (
  prevState: {
    message: string
    success: boolean
  },
  formData: FormData
) {
  const supabase = createClient({ isAdmin: true })

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
  revalidatePath('/teacher')
  redirect('/teacher')
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

  redirect('/teacher')
}
