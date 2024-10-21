import { type Profile } from '@/types/custom'

export function UserItem (profile: Profile) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
      <div>
        <p>{profile.email}</p>
      </div>
    </div>
  )
}
