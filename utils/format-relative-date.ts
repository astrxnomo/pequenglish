import { format, isToday, isTomorrow, isYesterday, isThisWeek, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

function capitalizeFirstLetter (string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatRelativeDate (dateString: string): string {
  const date = parseISO(dateString)

  if (isToday(date)) {
    return 'Hoy'
  } else if (isTomorrow(date)) {
    return 'Mañana'
  } else if (isYesterday(date)) {
    return 'Ayer'
  } else if (isThisWeek(date)) {
    return capitalizeFirstLetter(format(date, 'EEEE', { locale: es }))
  } else {
    return format(date, 'dd/MM/yyyy', { locale: es })
  }
}
