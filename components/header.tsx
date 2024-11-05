import React from 'react'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import AuthenticatedNav from '@/components/auth/authenticated-nav'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

export default async function Header () {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <Link className="flex items-center justify-center" href="/">
            <span className="flex gap-2 items-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700">
              <BookOpen className="h-7 w-7 text-teal-600" />
              Pequenglish
            </span>
          </Link>
          </div>

            {user
              ? (
                <AuthenticatedNav />
                )
              : (
                <Button asChild className="bg-teal-600 hover:bg-teal-700" size="lg">
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                )
            }
        </nav>
      </div>
    </header>
  )
}
