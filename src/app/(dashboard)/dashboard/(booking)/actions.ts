import { HTTPResponse } from "@/lib/commonTypes"
import { getCookies } from "@/lib/token/getCookies"
import { serverUrl } from "@/lib/utils"

export type BookingRequest = {
  booking_id?: number
  created_by?: string
  pnr_code?: string
  total_passenger?: number
  booking_created_at?: Date
  booking_status?: string
  ticket_issue_last_time?: null
  payable_amount?: string
  journey_type?: string
}

export async function getBookingList(
  token: string
): Promise<HTTPResponse<BookingRequest[]>> {
  const customHeaders = new Headers()
  customHeaders.append("Content-Type", "application/json")
  customHeaders.append("Authorization", `Bearer ${token}`)

  const apiUrl = serverUrl("/booking/flight-booking")
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
export type IBookingDetails = {
  booking_id?: number
  created_by?: string
  user_email?: string
  user_mobile?: string
  pnr_code?: string
  total_passenger?: number
  booking_created_at?: string
  booking_status?: string
  ticket_issue_last_time?: string
  payable_amount?: string
  ticket_price?: string
  base_fare?: string
  total_tax?: string
  ait?: string
  discount?: string
  journey_type?: string
  segments?: Segment[]
  traveler?: Traveler[]
  ticket?: Ticket
}

export interface Segment {
  id?: number
  flight_booking_id?: number
  flight_number?: string
  airline?: string
  airline_code?: string
  airline_logo?: string
  origin?: string
  destination?: string
  class?: string
  baggage?: string
  departure_date?: string
  arrival_date?: string
  departure_time?: string
  arrival_time?: string
}

export interface Ticket {
  ticket_issue_data?: TicketIssueDatum[]
  ticket_issue_segment_data?: TicketIssueSegmentDatum[]
}

export interface TicketIssueDatum {
  id?: number
  flight_booking_id?: number
  traveler_given_name?: string
  traveler_surname?: string
  traveler_reference?: string
  reservation_code?: string
  traveler_type: string
  date_issued?: string
  ticket_number?: string
  issuing_airline?: string
  issuing_agent?: string
  issuing_agent_location?: null
  iata_number?: string
  sub_total?: string
  taxes?: string
  total?: string
  currency?: string
}

export interface TicketIssueSegmentDatum {
  id?: number
  flight_booking_id?: number
  airline_name?: string
  airline_code?: string
  flight_number?: string
  reservation_code?: string
  departure_address?: string
  fromAirportCode: string
  toAirportCode?: string
  arrival_date: string
  departure_time?: string
  departure_terminal?: string
  arrival_address?: string
  arrival_time?: string
  arrival_terminal?: string
  departure_date?: string
  cabin_type?: string
  cabin_code?: string
  status?: string
  fare_basis?: string
  bags?: string
  operated_by?: string
}

export interface Traveler {
  id?: number
  flight_booking_id?: number
  type?: string
  reference?: string
  mid_name?: string
  sur_name?: string
  phone?: string
  date_of_birth?: string
  gender?: string
  email?: string
  passport_number?: string
  passport_expiry_date?: string
  city_id?: number
  country_id?: number
  visa_file?: null
  passport_file?: null
  country_name?: string
  city_name?: string
}

export async function bookingDetails(
  id: string,
  token: string
): Promise<HTTPResponse<IBookingDetails>> {
  const apiUrl = serverUrl(`/booking/flight-booking/${parseInt(id)}`)

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
