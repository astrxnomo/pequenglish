import React from 'react'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import SignOutForm from '@/components/auth/signout-form'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export default async function Header () {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

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
              <Link href='/dashboard'>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='outline' type="submit" size="icon" aria-label="Crear tarea">
                        <Home/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                      Panel principal
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
