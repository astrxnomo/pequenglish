import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export function formatRelativeDate (dateString: string): string {
  const date = moment.utc(dateString)
  const now = moment.utc()

  if (date.isSame(now, 'day')) {
    return 'Hoy'
  }

  if (date.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return 'Ayer'
  }

  if (date.isSame(now.clone().add(1, 'day'), 'day')) {
    return 'Mañana'
  }

  if (date.isSame(now, 'week')) {
    const dayOfWeek = date.format('dddd')
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
  }

  return date.format('DD/MM/YY')
}
