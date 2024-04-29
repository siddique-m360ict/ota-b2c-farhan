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

export function convertTimeFormatHM(inputTime: string) {
  const timeComponents = inputTime.split(":")
  if (timeComponents.length !== 3) {
    return "Invalid time format"
  }
  const hours = parseInt(timeComponents[0], 10)
  const minutes = parseInt(timeComponents[1], 10)

  if (isNaN(hours) || isNaN(minutes)) {
    return "Invalid time format"
  }

  const formattedTime = `${hours}h ${minutes}m`

  return formattedTime
}
