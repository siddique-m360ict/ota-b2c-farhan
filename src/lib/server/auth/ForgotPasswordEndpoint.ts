import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface response {
  email: string
}
export async function sendOTP(
  email: string,
  type
): Promise<HTTPResponse<response>> {
  const apiUrl = serverUrl("/common/send-email-otp")
  const data = JSON.stringify({
    email,
    type,
  })

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: myHeaders,
    body: data,
    cache: "no-store",
  })

  const responseData = await response.json()
  return responseData
}

// match otp ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
interface MatchOTPResponse {
  success: boolean
  token?: string
}
export const matchOTP = async (email, otp, type) => {
  const api = serverUrl("/common/match-email-otp")
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  const data = JSON.stringify({
    email,
    otp,
    type,
  })

  const response = await fetch(api, {
    method: "POST",
    headers,
    body: data,
    cache: "no-store",
  })

  const responseData = await response.json()
  return responseData
}

// Update Password  -->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const changePassword = async (email, token, password) => {
  const api = serverUrl("/auth/user/forget-password")
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const data = JSON.stringify({
    email,
    token,
    password,
  })

  const response = await fetch(api, {
    method: "POST",
    headers,
    body: data,
    cache: "no-store",
  })

  const responseData = await response.json()
  return responseData
}
