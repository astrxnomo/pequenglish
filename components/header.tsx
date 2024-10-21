import React from 'react'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import SignOutForm from '@/components/auth/signout-form'
import { Button } from '@/components/ui/button'

export default async function Header () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Pequenglish</span>
          </Link>
          <Link href="/todos">Todos</Link>
          <Link href="/teacher">Teacher</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user
            ? (
            <SignOutForm />
              )
            : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
              )}
        </div>
      </div>
    </header>
  )
}
