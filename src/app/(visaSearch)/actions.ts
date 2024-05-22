import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface IReqVisaSearch {
  country_id?: string | null
  departuredate?: string | null
  returndate?: string | null
  adults?: string | null
  child?: string | null
  infant?: string | null
  kids?: string | null
}
export interface IGetVisaList {
  id?: string
  country_id?: string
  country_name?: string
  visa_fee?: string
  processing_fee?: string
  type?: string
  max_validity?: number
  description?: string
  stay_validity?: number
  processing_type?: string
  status?: boolean
}
export const getAllVisa = async (params: IReqVisaSearch) => {
  try {
    if (Object.keys(params).length === 0) {
      return { success: false, message: "search params not found" }
    }
    const apiUrl = serverUrl(`/common/visa?country_id=${params?.country_id}`)
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const response = await fetch(apiUrl, {
      headers: myHeaders,
      cache: "no-store",
    })

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data")
    // }
    const res = await response.json()
    return res
  } catch (error) {
    console.error("Error getting Visa:", error)
    throw new Error("Failed to fetch Visa")
  }
}

export interface IGetSingleVisa {
  id?: string
  country_id?: string
  country_name?: string
  visa_fee?: string
  processing_fee?: string
  max_validity?: number
  type?: string
  description?: string
  stay_validity?: number
  visa_mode?: string
  processing_type?: string
  documents_details?: string
  status?: boolean
}

export const fetchSingleVisa = async (visaID: string) => {
  const apiUrl = serverUrl(`/common/visa/${visaID}`)
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

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

export async function visaApplicationPost(
  data,
  token: string,
  visa_id,
  fromDate,
  toDate
): Promise<any> {
  const apiUrl = serverUrl("/booking/visa-application")

  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const formattedData = {
    visa_id,
    from_date: fromDate,
    to_date: toDate,
    traveler: data.passengers.length,
    contact_email: data.passengers[0].contact_email,
    contact_number: data.passengers[0].contact_number,
    ...(data.passengers[0].whatsapp_number
      ? { whatsapp_number: data.passengers[0].whatsapp_number }
      : {}),
    passengers: data.passengers.map((passenger: any) => ({
      type: passenger.type,
      title: passenger.title,
      first_name: passenger.first_name,
      last_name: passenger.last_name,
      date_of_birth: passenger.date_of_birth,
      passport_number: passenger.passport_number,
      passport_expiry_date: passenger.passport_expiry_date,
      passport_type: passenger.passport_type,
      city: passenger.city || "",
      country_id: passenger.country_id || "",
      address: passenger.address || "",
    })),
  }

  const response = await fetch(apiUrl, {
    cache: "no-store",
    headers: headers,
    method: "POST",
    body: JSON.stringify(formattedData),
  })
  const res = await response.json()

  return res
}

export interface IGetVisaApplicationList {
  id?: string
  user_id?: string
  username?: string
  first_name?: string
  last_name?: string
  visa_id?: string
  max_validity?: number
  type?: string
  description?: string
  from_date?: Date
  to_date?: Date
  traveler?: number
  visa_fee?: string
  processing_fee?: string
  payable?: string
  application_date?: Date
  contact_email?: string
  contact_number?: string
}

export async function getVisaApplicationList(
  token: string
): Promise<HTTPResponse<IGetVisaApplicationList[]>> {
  const customHeaders = new Headers()
  customHeaders.append("Content-Type", "application/json")
  customHeaders.append("Authorization", `Bearer ${token}`)

  const apiUrl = serverUrl("/booking/visa-application")
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: customHeaders,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status || 500}`)
  }

  return response.json()
}

export interface IVisaApplicationDetails {
  id?: string
  user_id?: string
  username?: string
  visa_id?: string
  max_validity?: number
  type?: string
  description?: string
  from_date?: Date
  to_date?: Date
  traveler?: number
  visa_fee?: string
  processing_fee?: string
  payable?: string
  application_date?: Date
  contact_email?: string
  contact_number?: string
  whatsapp_number?: string
  traveler_data?: TravelerDatum[]
  tracking_data?: TrackingDatum[]
}

export interface TrackingDatum {
  id?: string
  status?: string
  details?: string
  created_date?: Date
}

export interface TravelerDatum {
  id?: string
  title?: string
  first_name?: string
  last_name?: string
  type?: string
  date_of_birth?: Date
  passport_number?: string
  passport_expiry_date?: Date
  city?: string
  country_name?: string
  address?: string
  passport_type?: string
}

export async function visaApplicationDetails(
  id: string,
  token: string
): Promise<HTTPResponse<IVisaApplicationDetails>> {
  const apiUrl = serverUrl(`/booking/visa-application/${id}`)

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Authorization", `Bearer ${token}`)

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("failed to fetch")
  }
  const res = await response.json()
  return res
}
