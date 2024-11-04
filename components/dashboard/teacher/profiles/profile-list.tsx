'use client'

import { useEffect, useState } from 'react'
import { type Profile } from '@/types/custom'
import { Card, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { UserListSkeleton } from './profile-list-skeleton'
import ProfileItem from './profile-item'
import { toast } from 'sonner'

export default function ProfileList () {
  const [profiles, setProfiles] = useState<Profile[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      const supabase = await createClient()

      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*, users_role(role)')
        .order('created_at', { ascending: false })

      if (error) {
        toast.error(error.message)
      } else {
        setProfiles(profiles)
      }

      setLoading(false)
    }

    fetchProfiles()
  }, [])

  if (loading) return <UserListSkeleton />

  if (!profiles || profiles.length === 0) {
    return (
      <Card className="p-5">
        <CardContent className="p-6 text-center text-gray-500">
          No hay usuarios registrados.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {(
        profiles?.map((profile) => (
        <ProfileItem key={profile.id} profile={profile} />
        ))
      )}
    </div>
  )
}
