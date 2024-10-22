import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function TaskSkeleton () {
  return (
    <Card className="transition-shadow hover:shadow-lg rounded-lg border border-gray-200">
      <CardHeader className="flex bg-gray-50 p-4 rounded-t-lg">
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800 flex-grow overflow-hidden whitespace-nowrap text-ellipsis">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-6 rounded-full ml-2" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <Skeleton className="h-6 w-2/4" />
          <Skeleton className="h-6 w-1/4 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

export function TaskListSkeleton () {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  )
}
