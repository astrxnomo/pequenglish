import { type Profile } from '@/types/custom'
import { Card, CardContent } from '@/components/ui/card'
import UpdateProfileButton from './update-profile-button'

export default function UserItem ({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-gray-500">
          {profile.users_role?.role === 'teacher' ? 'Profesor' : 'Estudiante'}
        </p>
        <div className="flex gap-2 items-center">
          <h2 className={profile.name ? 'text-xl font-bold' : 'text-xl font-bold text-red-700'}>
            {profile.name ?? 'Sin nombre'}
          </h2>
          <UpdateProfileButton profileId={profile.id}/>
        </div>
        <p className="text-gray-500">{profile.email}</p>
      </CardContent>
    </Card>
  )
}
