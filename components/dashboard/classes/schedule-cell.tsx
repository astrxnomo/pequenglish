export interface ClassItemProps {
  student_name?: string
  start_time: string
  end_time: string
}

export default function ClassItem (classInfo: ClassItemProps) {
  if (!classInfo) {
    return <div className="flex-1 border-r border-b p-1" />
  }

  return (
      <div className="flex-1 border-r border-b p-1">
        <div className="bg-emerald-100 rounded p-1 h-4 text-[8px] md:text-xs md:h-5 font-semibold flex justify-center items-center">
          <p className="mt-1">{classInfo.student_name}</p>
        </div>
      </div>
  )
}
