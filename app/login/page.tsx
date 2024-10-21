import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import LoginForm from '@/components/auth/login-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Login () {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return redirect('/todos')
  }

  return (
    <section className="h-[calc(100vh-300px)] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  )
}
