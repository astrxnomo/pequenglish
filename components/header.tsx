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
          <div className="inline-flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-100">
            <BookOpen className="h-6 w-6 text-teal-600" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-2xl font-bold text-transparent">
              Pequenglish
            </span>
          </div>
          </Link>
          </div>

            {user
              ? (
                <AuthenticatedNav />
                )
              : (
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
                )
            }
        </nav>
      </div>
    </header>
  )
}
