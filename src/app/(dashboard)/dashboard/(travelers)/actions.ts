"use server"
import { Travelers } from "@/components/Dashboard/traveler/addTravelerForm"
import { HTTPResponse } from "@/lib/commonTypes"
import { getCookies } from "@/lib/token/getCookies"
import { serverUrl } from "@/lib/utils"

export async function CreateTravels(data: Travelers, token) {
  try {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    const apiURL = serverUrl("/booking/traveler")
    const response = await fetch(apiURL, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      cache: "no-store",
    })
    const result = await response.json()

    return result
  } catch (error) {
    console.error("error", error)
    throw error
  }
}

export async function getTravelers(
  token: string
): Promise<HTTPResponse<Travelers[]>> {
  const customHeaders = new Headers()
  customHeaders.append("Content-Type", "application/json")
  customHeaders.append("Authorization", `Bearer ${token}`)

  const apiUrl = serverUrl("/booking/traveler")
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: customHeaders,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status || 500}`)
  }
  // console.log(await response.json())

  return response.json()
}

// get single traveler
export const fetchSingleTraveler = async (
  travelerId: string,
  token?: string
) => {
  const apiUrl = serverUrl(`/booking/traveler/${travelerId}`)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", `Bearer ${token}`)
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status || 500}`)
  }

  return response.json()
}

// update traveler
export async function UpdateTravels(data: Travelers, token, id) {
  try {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${token}`)

    const apiURL = serverUrl(`/booking/traveler/${id}`)
    const response = await fetch(apiURL, {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(data),
      cache: "no-store",
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error("error", error)
    throw error
  }
}
