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
