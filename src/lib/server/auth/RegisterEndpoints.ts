import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface registerResponse {
  id?: number
  username?: string
  first_name?: string
  last_name?: string
  gender?: string
  email?: string
  phone_number?: string
  photo?: string
  is_verified?: boolean
  status?: boolean
  create_date?: Date
}

export async function registerUser(
  data: FormData
): Promise<HTTPResponse<registerResponse>> {
  const apiUrl = serverUrl("/auth/user/registration")

  const response = await fetch(apiUrl, {
    method: "POST",
    body: data,
    redirect: "follow",
  })

  return response.json()
}
