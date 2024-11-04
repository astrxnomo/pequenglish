import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Profile } from '@/types/custom'

export default function UserItem ({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col">
          <p className='text-sm text-gray-500'>
            {profile.users_role[0].role === 'teacher' ? 'Profesor/a' : 'Estudiante'}
          </p>
        <div className="inline-flex gap-2 items-center">
          <h2 className={profile.name ? 'text-xl font-bold' : 'text-xl font-bold text-muted-foreground'}>
            {profile.name ?? 'Sin nombre'}
          </h2>
          <Link href={`/dashboard/users/${profile.id}/edit`}>
            <Badge>
              Editar
            </Badge>
          </Link>
        </div>
        <p className="text-gray-500">{profile.email}</p>
      </CardContent>
    </Card>
  )
}
