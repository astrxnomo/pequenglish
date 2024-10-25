import { type Profile } from '@/types/custom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function UserItem ({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-2 items-center">
          <h2 className={profile.name ? 'text-xl font-bold' : 'text-xl font-bold text-muted-foreground'}>
            {profile.name ?? 'Sin nombre'}
          </h2>
            <Link href={`/teacher/users/${profile.id}/edit`}>
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
