"use server"

import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

// Login ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      email,
      password,
    }),
    cache: "no-store",
  })
  return response.json()
}

// register ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
    cache: "no-store",
  })
  return response.json()
}
