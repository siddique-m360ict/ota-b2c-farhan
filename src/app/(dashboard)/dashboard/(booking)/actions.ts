import { HTTPResponse } from "@/lib/commonTypes"
import { getCookies } from "@/lib/token/getCookies"
import { serverUrl } from "@/lib/utils"

export type BookingRequest = {
  id: number
  status: string
  journey_type: string
  created_date: Date
  payable: string
  note: null
  user_id: number
  username: string
  user_photo: string
  phone_number: string
}

export async function getBookingRequest(
  token: string
): Promise<HTTPResponse<BookingRequest[]>> {
  const customHeaders = new Headers()
  customHeaders.append("Content-Type", "application/json")
  customHeaders.append("Authorization", `Bearer ${token}`)

  const apiUrl = serverUrl("/booking/booking-request")
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

// get single booking request
export type IBookingRequestDetails = {
  id: number
  status: string
  journey_type: string
  ait: string
  created_date: Date
  note: null
  commission: string
  total_price: string
  base_fair: string
  total_tax: string
  discount: string
  payable: string
  total_travelers: number
  traveler_adult: number
  traveler_children: number
  traveler_kids: number
  traveler_infants: number
  user_id: number
  username: string
  user_photo: string
  user_email: string
  user_phone: string
  admin_id: null
  admin_name: null
  admin_photo: null
  segments: Segment[]
  travelers: Traveler[]
}

export interface Segment {
  id: number
  booking_request_id: number
  flight_number: string
  airline: string
  airline_logo: string
  airline_code: string
  origin: string
  destination: string
  class: string
  baggage: string
  departure_date: Date
  arrival_date: Date
  departure_time: Date
  arrival_time: string
}

export interface Traveler {
  id: number
  booking_request_id: number
  type: string
  title: string
  first_name: string
  last_name: string
  date_of_birth: Date
  passport_number: string
  passport_expiry_date: Date
  city_id: number
  email: string
  phone: string
  frequent_flyer_airline: string
  frequent_flyer_number: string
  city_name: string
}
export async function bookingRequestDetails(
  id: string,
  token: string
): Promise<HTTPResponse<IBookingRequestDetails>> {
  const apiUrl = serverUrl(`/booking/booking-request/${parseInt(id)}`)

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
