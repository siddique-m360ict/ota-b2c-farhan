"use server"

import { IFlightSearchList } from "@/components/home/elements/types/flightSearchType"
import { HTTPResponse } from "@/lib/commonTypes"
import { MultiWayFormatter } from "@/lib/formatter/MultiWayFormatter"
import { OneWayFormatter } from "@/lib/formatter/oneWayFormatter"
import { RoundWayFormatter } from "@/lib/formatter/roundWayFormatter"
import { FilterAirlines } from "@/lib/redux/slice/filterOptions"
import { serverUrl } from "@/lib/utils"
import { addDays, format } from "date-fns"
interface IReqFlightSearch {
  origin?: string | null
  destination?: string | null
  departuredate?: string | null
  returndate?: string | null
  adults?: string | null
  max?: string | null
  child?: string | null
  infant?: string | null
  kids?: string | null
  route?: "oneway" | "roundway" | "multiway" | string | null
  class?:
    | "Economy"
    | "Premium Economy"
    | "Business Class"
    | "First Class"
    | string
    | null
  trips?: string | null
  carrier_marketing?: string | null
  min_price?: number | string | null
  max_price?: number | string | null
  refundable?: string | null
  stoppage?: string | null
  page?: number | string | null
  size?: number | string | null
}

const sanitizeSearchParams = (searchParams: any) => {
  const sanitizeParams: { [key: string]: string } = {}
  function addIfNotNull(
    property: string,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      sanitizeParams[property] = value
    }
  }
  addIfNotNull("origin", searchParams.origin)
  addIfNotNull("destination", searchParams.destination)
  addIfNotNull("trips", searchParams.trips)
  addIfNotNull("adults", searchParams.adults)
  addIfNotNull("child", searchParams.child)
  addIfNotNull("infant", searchParams.infant)
  addIfNotNull("kids", searchParams.kids)
  addIfNotNull("carrier_marketing", searchParams.carrier_marketing)
  addIfNotNull("class", searchParams.class)
  addIfNotNull("departuredate", searchParams.departuredate)
  addIfNotNull(
    "returndate",
    searchParams.route === "oneway" ? null : searchParams.returndate
  )
  addIfNotNull("max", searchParams.max)
  addIfNotNull("max_price", searchParams.max_price)
  addIfNotNull("min_price", searchParams.min_price)
  addIfNotNull("route", searchParams.route)
  addIfNotNull("page", searchParams.page)
  addIfNotNull("refundable", searchParams.refundable)
  addIfNotNull("size", searchParams.size)
  addIfNotNull("stoppage", searchParams.stoppage)
  return sanitizeParams
}

const initialSearchParams = {
  origin: "DAC",
  destination: "CXB",
  departuredate: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  adults: "1",
  class: "Y",
  route: "oneway",
}

export const getAllFlights = async (params: IReqFlightSearch) => {
  try {
    if (Object.keys(params).length === 0) {
      return { success: false, message: "search params not found" }
    }

    const apiUrl = serverUrl(`/booking/flight/search`)
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const sanitizeParams = sanitizeSearchParams(params)

    let requestBody
    if (sanitizeParams.route === "oneway") {
      requestBody = OneWayFormatter(sanitizeParams)
    } else if (sanitizeParams.route === "roundway") {
      requestBody = RoundWayFormatter(sanitizeParams)
    } else if (sanitizeParams.route === "multiway") {
      requestBody = MultiWayFormatter(sanitizeParams)
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
      cache: "no-store",
    })

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data")
    // }
    const res = await response.json()
    return res
  } catch (error) {
    console.error("Error getting flights:", error)
    throw new Error("Failed to fetch Flights")
  }
}

// flight filter
// =================================================
export async function filterFlightList(
  filter: FilterAirlines,
  page: number
): Promise<HTTPResponse<IFlightSearchList>> {
  // Structuring URL
  let apiUrl = serverUrl(`/booking/flight/filter?page=${page}&size=20`)

  if (Array.isArray(filter?.carrier_operating)) {
    if (filter?.carrier_operating.length > 0) {
      apiUrl += `&carrier_operating=${filter.carrier_operating}`
    }
  }

  if (filter.min_price) {
    apiUrl += `&min_price=${filter.min_price}`
  }
  if (filter.max_price) {
    apiUrl += `&max_price=${filter.max_price}`
  }
  if (filter.refundable) {
    apiUrl += `&refundable=${filter.refundable}`
  }

  if (Array.isArray(filter?.stoppage)) {
    if (filter?.stoppage.length > 0) {
      apiUrl += `&stoppage=${filter.stoppage}`
    }
  }

  if (filter.aircraft) {
    apiUrl += `&aircraft=${filter.aircraft}`
  }
  if (filter.elapsed_time_min) {
    apiUrl += `&elapsed_time_min=${filter.elapsed_time_min}`
  }
  if (filter.departure_timings) {
    apiUrl += `&departure_timing=${filter.departure_timings}`
  }
  if (filter.arrival_timings) {
    apiUrl += `&arrival_timing=${filter.arrival_timings}`
  }
  if (filter.sort_by) {
    apiUrl += `&sort_by=${filter.sort_by}`
  }

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}
