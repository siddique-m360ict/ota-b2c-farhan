import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface LoginResData {
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

export interface IReqType {
  email: string
  password: string
}

export async function postLogin({
  password,
  email,
}: IReqType): Promise<HTTPResponse<LoginResData>> {
  const apiUrl = serverUrl("/auth/user/login")

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  let raw = JSON.stringify({
    email,
    password,
  })
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  })

  // if (!response?.ok) {
  //   throw new Error("Something Happened Wrong")
  // }

  return response.json()
}
