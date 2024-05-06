"use server"
import { HTTPResponse } from "@/lib/commonTypes"
import { getCookies } from "@/lib/token/getCookies"
import { serverUrl } from "@/lib/utils"

export interface IRevalidated {
  flight_id?: string
  fare: RevalidateFare
  refundable: Refundable[]
  flight_class: FlightClass[]
  carrier_code?: string
  carrier_name?: string
  carrier_logo?: string
  ticket_last_date?: Date
  leg_descriptions: LegDescription[]
  flights?: Flight[]
  passengers: Passenger[]
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

export interface FlightClass {
  type?: string
  booking_code?: string
  cabin_type: string
}

export interface Flight {
  stoppage?: number
  id?: number
  elapsed_time: number
  options: Option[]
  layover_time?: string[]
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
  airport: string
  city: string
  airport_code: string
  city_code?: string
  country?: string
  time?: string
  date?: Date
  terminal?: string
  date_adjustment?: number
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
  baggage?: Baggage
  meal_code?: string
  meal_type?: string
  cabin_code?: string
  cabin_type?: string
  booking_code?: string
  fare?: PassengerFare
}

export interface Baggage {
  id?: number
  pieceCount?: number
}

export interface PassengerFare {
  total_fare?: number
  tax?: number
  base_fare?: number
}

export interface Refundable {
  type?: string
  refundable: boolean
}

export async function ReValidateFlightV2(
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
