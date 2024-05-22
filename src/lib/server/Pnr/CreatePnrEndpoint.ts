import { serverUrl } from "@/lib/utils"

export interface PnrResponse {
  sessionUrl: string
}

export interface PnrFormData {
  address: string
  city: string
  country: string
  date_of_birth: string
  documentNumber: string
  email: string
  expiryDate: string
  gender: string
  issuingCountryCode: string
  mid_name: string
  phone: string
  post_code: string
  reference: string
  residenceCountryCode: string
  sur_name: string
  type: string
}

export type submitPnr = {
  passengers: PnrFormData[]
  flight_id: string
}

export type pnrSubmit = Omit<submitPnr, "flight_id">

export async function CreatePNR(data: submitPnr, token?: string): Promise<any> {
  const apiUrl = serverUrl("/booking/booking-request")

  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)

  const response = await fetch(apiUrl, {
    cache: "no-store",
    headers: headers,
    method: "POST",
    body: JSON.stringify(data),
  })

  if (!response?.ok) {
    throw new Error("Something Happened Wrong")
  }
  return response.json()
}
