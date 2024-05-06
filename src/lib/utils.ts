import { type ClassValue, clsx } from "clsx"
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
