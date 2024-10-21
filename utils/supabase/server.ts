import { type Database } from '@/types/supabase'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient ({ isAdmin = false } = {}) {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    // Usa la "Service Role Key" si isAdmin es true, de lo contrario, la clave anónima
    isAdmin
      ? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '' // Clave de servicio para operaciones admin
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '', // Clave anónima pública
    {
      cookies: {
        get (name: string) {
          // Solo manejar cookies si no es admin (ya que el admin no las necesita)
          return !isAdmin ? cookieStore.get(name)?.value : undefined
        },
        set (name: string, value: string, options: CookieOptions) {
          if (!isAdmin) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // Si esto ocurre en un Server Component, se puede ignorar si tienes middleware
              // que refresca sesiones de usuario.
            }
          }
        },
        remove (name: string, options: CookieOptions) {
          if (!isAdmin) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // Igualmente, se puede ignorar en Server Components con middleware
            }
          }
        }
      }
    }
  )
}
