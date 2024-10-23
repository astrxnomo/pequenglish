import { DAYS_OF_WEEK, HOURS } from './schedule-table'

export default function ScheduleSkeleton () {
  return (
    <div className="min-w-[200px] md:min-w-[800px] animate-pulse">
      <div className="sticky top-0 z-10 flex border-b">
        <div className="w-8 md:w-16"></div>
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="flex-1 text-center font-semibold py-2 text-[10px] md:text-sm md:py-3">
            <div className="bg-gray-200 h-4 rounded-md"></div>
          </div>
        ))}
      </div>
      {HOURS.map((hour) => (
        <div key={hour} className="flex">
          <div className="w-10 md:w-16 text-right pr-2 py-1 text-[10px] md:text-sm font-medium">
            <div className="bg-gray-200 h-4 rounded-md"></div>
          </div>
          {DAYS_OF_WEEK.map((_, dayIndex) => (
            <div key={dayIndex} className="flex-1 border-r border-b p-1">
              <div className="bg-gray-200 h-2 md:h-5 rounded-md"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
