import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import CreateUserForm from '@/components/dashboard/teacher/profiles/create-user-form'
import Link from 'next/link'
import BackButton from '@/components/back-button'

export default async function CreateProfilePage () {
  return (
      <div className="flex flex-col gap-2">
        <Link href="/teacher">
          <BackButton/>
        </Link>

        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Crear usuario</CardTitle>
            <CardDescription>
              Ingresa el email y contraseña del usuario a crear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateUserForm />
          </CardContent>
        </Card>
      </div>
  )
}
