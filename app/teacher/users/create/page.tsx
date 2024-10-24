import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import CreateUserForm from '@/components/dashboard/teacher/profiles/create-user-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CreateProfilePage () {
  return (
    <section className="h-[calc(100vh-60px)] flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crear usuario</CardTitle>
          <CardDescription>
            Ingresa el email y contraseña del usuario a crear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
          <div className="mt-4">
            <Link href="/teacher" passHref>
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
