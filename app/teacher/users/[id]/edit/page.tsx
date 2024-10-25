import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import EditProfileForm from '@/components/dashboard/teacher/profiles/edit-profile-form'
import { createClient } from '@/utils/supabase/server'

export default async function Page (props: { params: { id: string } }) {
  const { id } = props.params

  console.log(id)
  const supabase = createClient()
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return (
    <section className="h-[calc(100vh-125px)] flex justify-center items-center">
        <div className="flex flex-col gap-2">
        <Link href="/teacher">
            <Button variant="outline">
            <ArrowLeft />
            Volver
            </Button>
        </Link>
        <Card className="mx-auto max-w-sm">
            <CardHeader>
            <CardTitle className="text-2xl">Error</CardTitle>
            <CardDescription>
                {error.message}
            </CardDescription>
            </CardHeader>
        </Card>
        </div>
    </section>
    )
  }

  return (
    <section className="h-[calc(100vh-125px)] flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <Link href="/teacher">
          <Button variant="outline">
            <ArrowLeft />
            Volver
          </Button>
        </Link>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Editar usuario</CardTitle>
            <CardDescription>
              Ingresa el email y contraseña del usuario a crear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditProfileForm profile={profile} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
