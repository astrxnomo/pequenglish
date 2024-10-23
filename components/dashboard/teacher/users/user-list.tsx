'use client'

import { type Profile } from '@/types/custom'
import CreateUserButton from './create-user-button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Badge } from 'lucide-react'

export function UserList ({ profiles }: { profiles: Profile[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {profiles && profiles.length > 0
        ? (
            profiles.map((profile) => (
            <Card key={profile.id}>
              <CardContent className="p-6">
                <p className="text-gray-500">
                  {/* {profile.user_roles?.role === 'teacher' ? 'Profesor' : 'Estudiante'} */}
                  </p>
                <div className="flex gap-2 items-center">
                  <h2 className={profile.name ? 'text-xl font-bold' : 'text-xl font-bold text-red-700'}>
                    {profile.name ?? 'Sin nombre'}
                  </h2>
                  <Link href={`/dashboard/profiles/${profile.id}`}>
                    <Badge className="p-0.5 px-1">Editar</Badge>
                  </Link>
                </div>
                <p className="text-gray-500">{profile.email}</p>
              </CardContent>
            </Card>
            ))
          )
        : (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No hay usuarios registrados.
        </CardContent>
      </Card>
          )}
    </div>
  )
}
