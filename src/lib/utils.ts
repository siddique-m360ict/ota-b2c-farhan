import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function serverUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${path}`
}

export const imgHostLink =
  "https://m360-trabill.s3.ap-south-1.amazonaws.com/booking-expert-storage"

export function hostedImage(path: string) {
  return `${imgHostLink}${path}`
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

export function wait(ms: number): Promise<void> {
  // Wait for the specified amount of time
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatGlobalTime = (timeString) => {
  if (!timeString) return ""
  // Parse the time string with timezone offset into a Date object
  const date = new Date(`1970-01-01T${timeString}`)
  // Format the date to your desired format (global time format with timezone)
  const formattedTime = format(date, "HH:mm:ssXXX")
  return formattedTime
}

export function formatNumber(num) {
  return new Intl.NumberFormat("en-US").format(num)
}
