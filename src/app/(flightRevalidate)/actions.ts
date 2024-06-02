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

export async function ReValidateFlightV2(
  id: string
): Promise<HTTPResponse<IRevalidated>> {
  const apiUrl = serverUrl(`/booking/flight/revalidate/${id}`)

  const response = await fetch(apiUrl, {
    method: "GET",
    cache: "no-store",
    redirect: "follow",
  })

  if (!response?.ok) {
    throw new Error("Something Happened Wrong")
  }
  const res = await response.json()
  return res
}

// PNR CREATE
export interface PnrResponse {
  sessionUrl: string
}

export interface PnrFormData {
  city?: number
  date_of_birth?: Date
  email?: string
  first_name?: string
  frequent_flyer_airline?: string
  frequent_flyer_number?: string
  last_name?: string
  passport_expiry_date?: string
  passport_number?: string
  phone?: string
  title?: string
  type?: string
}

export type submitPnr = {
  passengers: PnrFormData[]
  flight_id: string
}

export type pnrSubmit = Omit<submitPnr, "flight_id">

export async function CreatePNR(data: submitPnr, token: string): Promise<any> {
  const apiUrl = serverUrl("/booking/booking-request")

  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  headers.append("Authorization", `Bearer ${token}`)
  const raw = {
    flight_id: "ebc55147-31b4-4537-9e9b-80a7dd1228bf",
    passengers: [
      {
        type: "ADT",
        title: "MR",
        first_name: "Mahin",
        last_name: "Mahfiz",
        date_of_birth: "2000-01-01",
        passport_number: "xc01954w",
        passport_expiry_date: "2028-02-02",
        city_id: 14,
        email: "mahin@gmail.com",
        phone: "01789945623",
        frequent_flyer_airline: "Biman Bangladesh",
        frequent_flyer_number: "3",
      },
    ],
  }

  const response = await fetch(apiUrl, {
    cache: "no-store",
    headers: headers,
    method: "POST",
    body: JSON.stringify(data),
  })
  const res = await response.json()

  return res
}
