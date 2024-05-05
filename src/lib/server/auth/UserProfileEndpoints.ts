import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface IProfileDetails {
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

export async function GetProfile(
  token: string
): Promise<HTTPResponse<IProfileDetails>> {
  const apiUrl = serverUrl("/booking/profile")
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
    cache: "no-store",
    next: { tags: ["collection"] },
  })
  const res = await response.json()
  return res
}

interface profileUpdateResponse {
  username?: string
  first_name?: string
  last_name?: string
  gender?: string
  photo?: string
}

export async function UpdateProfileDetails({
  body: body,
  token,
}: {
  body: any
  token?: string
}): Promise<HTTPResponse<profileUpdateResponse>> {
  const apiUrl = serverUrl("/booking/profile")
  let customHeaders = new Headers()
  customHeaders.append("Authorization", `Bearer ${token}`)

  const response = await fetch(apiUrl, {
    method: "PATCH",
    headers: customHeaders,
    cache: "no-store",
    body: body,
    next: { tags: ["collection"] },
  })

  return response.json()
}
