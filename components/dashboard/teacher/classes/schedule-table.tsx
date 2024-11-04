'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import moment from 'moment'
import { createClient } from '@/utils/supabase/client'
import { type Class, type Profile } from '@/types/custom'
import DaysHeader from './days-header'
import ScheduleSkeleton from './schedule-skeleton'
import ClassItem, { type ClassItemProps } from './class-item'
import { toast } from 'sonner'

export const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const HOURS = Array.from({ length: 14 }, (_, i) => i + 8)

const formatHour = (hour: number) => {
  const date = moment().hour(hour).minute(0).second(0)
  return date.format('h A').toUpperCase()
}

export default function ScheduleTable () {
  const [classesMap, setClassesMap] = useState<Record<number, Record<number, ClassItemProps | undefined>> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      const supabase = await createClient()
      const { data: classes, error } = await supabase
        .from('classes')
        .select('*, profiles(name)')

      if (error) {
        toast.error(error.message)
      } else {
        const classesMap = classes?.reduce<Record<number, Record<number, ClassItemProps | undefined>>>((acc, item: Class & { profiles: Profile }) => {
          const day = DAYS_OF_WEEK.indexOf(item.day_of_week)
          const startHour = parseInt(item.start_time.split(':')[0])
          const endHour = parseInt(item.end_time.split(':')[0])
          for (let hour = startHour; hour < endHour; hour++) {
            if (!acc[hour]) acc[hour] = {}
            acc[hour][day] = {
              student_name: item.profiles?.name ?? 'Sin nombre',
              start_time: item.start_time,
              end_time: item.end_time
            }
          }
          return acc
        }, {})

        setClassesMap(classesMap)
      }

      setLoading(false)
    }

    fetchClasses()
  }, [])

  if (loading) return <ScheduleSkeleton />

  return (
    <Card>
      <CardContent className='p-2 pt-0'>
          <div className="min-w-[200px] lg:min-w-[800px]">
            <DaysHeader daysOfWeek={DAYS_OF_WEEK} />
            {HOURS.map((hour) => (
              <div key={hour} className="flex">
                <div className="w-10 md:w-16 text-right pr-2 py-1 text-[10px] md:text-sm font-medium">
                  {formatHour(hour)}
                </div>
                {DAYS_OF_WEEK.map((_, dayIndex) => {
                  const classInfo = classesMap?.[hour]?.[dayIndex]
                  return (
                    <ClassItem
                      key={dayIndex}
                      classInfo={classInfo}
                    />
                  )
                })}
              </div>
            ))}
          </div>
      </CardContent>
    </Card>
  )
}
