export function UserListSkeleton () {
  return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-md p-6 h-28" />
        ))}
      </div>
  )
}
