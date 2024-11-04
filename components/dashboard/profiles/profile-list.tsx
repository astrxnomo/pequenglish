import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/server'
import ProfileItem from './profile-item'
import { type Profile } from '@/types/custom'

export default async function ProfileList () {
  const supabase = await createClient()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*, users_role(role)')
    .order('created_at', { ascending: false })

  return (
  <>
    {profiles?.length
      ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map(profile => (
            <ProfileItem key={profile.id} profile={profile as Profile} />
          ))}
        </div>
        )
      : (
        <Card className='p-4 w-full'>
          <CardContent className="p-4 text-center text-gray-500">
            No hay usuarios registrados.
          </CardContent>
        </Card>
        )}
  </>
  )
}
