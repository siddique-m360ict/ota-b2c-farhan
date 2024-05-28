export function timeSlice(timeString: any) {
  if (!timeString) return "No time found"
  const timeOnly = timeString.substring(0, 5)
  return timeOnly
}

export function minutesToHoursAndMinutes(minutes: any) {
  let toNum = Number(minutes || 0)
  let hours = Math.floor(toNum / 60) || 0
  let remainingMinutes = toNum % 60
  return { time: `${hours}h : ${remainingMinutes}m` }
}

export function formatFlightDate(DateTimeString: string | undefined) {
  if (!DateTimeString) return "No time found"
  const formattedDate = DateTimeString.split("T")[0]
  return formattedDate
}

export function convertMinutesToHM(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursPart = hours > 0 ? `${hours}h ` : ""
  const minutesPart = `${remainingMinutes}m`

  return `${hoursPart}${minutesPart}`
}
