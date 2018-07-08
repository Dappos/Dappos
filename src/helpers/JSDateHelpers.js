/**
 * JS Date Helpers
 *
 * @author     Luca Ban
 * @contact    https://lucaban.com
 */
import { differenceInCalendarDays } from 'date-fns/esm'

function xDaysAgo (date) {
  if (!date) { return false }
  const diff = differenceInCalendarDays(date, new Date())
  return diff
}
function dateIsToday (date) {
  return (xDaysAgo(date) === 0)
}
function dateIsTodayOrEarlier (date) {
  return (xDaysAgo(date) <= 0)
}
function dateIsBeforeToday (date) {
  return (xDaysAgo(date) < 0)
}

export {
  xDaysAgo,
  dateIsToday,
  dateIsTodayOrEarlier,
  dateIsBeforeToday
}
