"use server"
import { cookies } from "next/headers"

export const getCookies = () => {
  const cookieStore = cookies()
  const cookie = cookieStore.get("b_token")?.value

  return cookie
}
