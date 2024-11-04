export default function DaysHeader ({ daysOfWeek }: { daysOfWeek: string[] }) {
  return (
    <div className="flex border-b">
      <div className="w-8 md:w-16"></div>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="flex-1 text-center font-semibold py-2 text-[10px] md:text-sm md:py-3"
        >
          <span className="block md:hidden">{day.slice(0, 3)}</span>
          <span className="hidden md:block">{day}</span>
        </div>
      ))}
    </div>
  )
}
