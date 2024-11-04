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
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      success: false,
      message: 'Both email and password are required'
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Invalid email address'
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters long'
    }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      success: false,
      message: error.message
    }
  }

  redirect('/dashboard')
}

export async function signOut () {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      message: error.message
    }
  }

  redirect('/')
}
