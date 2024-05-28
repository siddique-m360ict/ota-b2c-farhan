import { HTTPResponse } from "@/lib/commonTypes"
import { getCookies } from "@/lib/token/getCookies"
import { serverUrl } from "@/lib/utils"

export interface IRevalidated {
  flight_id?: string
  fare?: RevalidateFare
  refundable?: Refundable[]
  carrier_code?: string
  carrier_name?: string
  carrier_logo?: string
  leg_descriptions?: LegDescription[]
  flights?: Flight[]
  passengers?: Passenger[]
}

export interface RevalidateFare {
  commission?: number
  base_fare?: number
  discount?: number
  ait?: number
  payable?: number
  total_price?: number
  total_tax?: number
}

export interface Flight {
  stoppage?: number
  id?: number
  elapsed_time?: number
  options?: Option[]
  layover_time?: number[]
}

export interface Option {
  id?: number
  e_ticketable?: boolean
  elapsedTime?: number
  stopCount?: number
  total_miles_flown?: number
  departure?: Arrival
  arrival?: Arrival
  carrier?: Carrier
}

export interface Arrival {
  airport?: string
  city?: string
  airport_code?: string
  city_code?: string
  country?: string
  time?: string
  date?: string
  terminal?: string
}

export interface Carrier {
  carrier_marketing_code?: string
  carrier_marketing_airline?: string
  carrier_marketing_logo?: string
  carrier_marketing_flight_number?: number
  carrier_operating_code?: string
  carrier_operating_airline?: string
  carrier_operating_logo?: string
  carrier_operating_flight_number?: number
}

export interface LegDescription {
  departureDate?: string
  departureLocation?: string
  arrivalLocation?: string
}

export interface Passenger {
  type?: string
  number?: number
  non_refundable?: boolean
  availability?: Availability[]
  fare?: PassengerFare
}

export interface Availability {
  id?: number
  from_airport?: string
  to_airport?: string
  segments?: Segment[]
  baggage?: Baggage
}

export interface Baggage {
  id?: number
  unit?: string
  count?: number
}

export interface Segment {
  id?: number
  name?: string
  meal_type?: string
  meal_code?: string
  cabin_code?: string
  cabin_type?: string
  booking_code?: string
  available_seat?: number
  available_break?: boolean
  available_fare_break?: boolean
}

export interface PassengerFare {
  total_fare?: number
  tax?: number
  base_fare?: number
}

export interface Refundable {
  type?: string
  refundable?: boolean
}

export async function ReValidateFlight(
  id: string
): Promise<HTTPResponse<IRevalidated>> {
  const apiUrl = serverUrl(`/booking/flight/revalidate/v2/${id}`)

  const customHeaders = new Headers()
  customHeaders.append("Content-Type", "application/json")
  customHeaders.append("Authorization", `${getCookies()}`)

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: customHeaders,
  })

  if (!response?.ok) {
    throw new Error("Something Happened Wrong")
  }
  return response.json()
}
