import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export interface IGetSingleTransaction {
  id?: number
  username?: string
  first_name: string
  last_name?: string
  email?: string
  phone_number?: string
  total_amount?: string
  booking_id?: number
  session_id?: string
  type?: string
  bank_tran_id?: string
  transaction_date?: Date
  pnr_code?: string
  status?: string
  ticket_price?: string
  base_fare?: string
  total_tax?: string
  payable_amount?: string
  ait?: string
  discount?: string
  total_passenger?: number
  journey_type?: string
}

export const fetchSingleTransaction = async (bookingID, token) => {
  const apiUrl = serverUrl(
    `/booking/payment/transaction?booking_id=${bookingID}`
  )
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
  const res = response.json()
  return res
}
