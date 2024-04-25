import { env } from "@/env.mjs"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// import { env } from "@/env.mjs"

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
// env.NEXT_PUBLIC_APP_URL
export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_BASE_SERVER_URL}${path}`
}
export function serverUrl(path: string) {
  return `${env.NEXT_PUBLIC_BASE_SERVER_URL}${path}`
}

export const imgHostLink =
  "https://m360-trabill.s3.ap-south-1.amazonaws.com/booking-expert-storage"

export function hostedImage(path: string) {
  return `${imgHostLink}${path}`
}
