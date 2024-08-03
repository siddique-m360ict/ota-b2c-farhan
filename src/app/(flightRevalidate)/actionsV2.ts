"use server"
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
  carrier_aircraft_code?: string
  carrier_aircraft_name?: string
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

export async function ReValidateFlightV2(body) {
  const apiUrl = serverUrl(`/booking/flight/revalidate/v2`)
  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: myHeaders,
    cache: "no-store",
  })

  if (!response?.ok) {
    throw new Error("Something Happened Wrong")
  }
  const res = await response.json()

  return res
}
