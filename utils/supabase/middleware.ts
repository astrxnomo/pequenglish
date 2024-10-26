import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession (request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  if (supabaseUrl === '' || supabaseAnonKey === '') {
    throw new Error('Supabase environment variables are not defined')
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get (name: string) {
          return request.cookies.get(name)?.value ?? ''
        },
        set (name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
          response.cookies.set({
            name,
            value,
            ...options
          })
        },
        remove (name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options
          })
          response = NextResponse.next({
            request: {
              headers: request.headers
            }
          })
          response.cookies.set({
            name,
            value: '',
            ...options
          })
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const { data: role } = await supabase
    .from('users_role')
    .select('user_id, role')
    .eq('user_id', user?.id)
    .single()

  if (request.nextUrl.pathname.startsWith('/teacher')) {
    if (role?.role !== 'teacher') {
      const url = new URL('/', request.url)
      return NextResponse.redirect(url)
    }
  }

  return response
}
