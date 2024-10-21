import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/todos'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token != null && type != null) {
    const supabase = createClient()

    const email = searchParams.get('email') ?? ''
    const { error } = await supabase.auth.verifyOtp({
      type,
      token,
      email
    })
    if (error == null) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/login?message=Could not verify OTP'
  return NextResponse.redirect(redirectTo)
}
