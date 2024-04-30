import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface response {
  email: string
}

export async function sendOTP(email: string): Promise<HTTPResponse<response>> {
  const apiUrl = serverUrl("/common/send-email-otp")
  const data = JSON.stringify({
    email,
    type: "reset_user",
  })

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  })

  const responseData = await response.json()
  return responseData
}
