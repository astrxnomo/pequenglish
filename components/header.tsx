import React from 'react'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import SignOutForm from '@/components/auth/signout-form'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

export default async function Header () {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let role

  if (user) {
    const { data: roleData } = await supabase
      .from('users_role')
      .select('user_id, role')
      .eq('user_id', user.id)
      .single()
    role = roleData?.role
  }

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Pequenglish</span>
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user
            ? (
            <div className='flex gap-2'>
              <Link href={role === 'teacher' ? '/teacher' : '/student'}>
                <Button variant='outline'>
                  <User />
                  Mi cuenta
                </Button>
              </Link>
              <SignOutForm />
            </div>
              )
            : (
            <Button asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
              )}
        </div>
      </div>
    </header>
  )
}
