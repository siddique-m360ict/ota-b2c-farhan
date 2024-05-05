"use server"

import { MultiWayFormatter } from "@/lib/formatter/MultiWayFormatter"
import { OneWayFormatter } from "@/lib/formatter/oneWayFormatter"
import { RoundWayFormatter } from "@/lib/formatter/roundWayFormatter"
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

    const apiUrl = serverUrl(`/booking/flight/search/v2`)
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const sanitizeParams = sanitizeSearchParams(params)

    let requestBody
    if (sanitizeParams.route === "oneway") {
      requestBody = OneWayFormatter(sanitizeParams)
    } else if (sanitizeParams.route === "roundway") {
      requestBody = MultiWayFormatter(sanitizeParams)
    } else if (sanitizeParams.route === "multiway") {
      requestBody = RoundWayFormatter(sanitizeParams)
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
    })

    return response.json()
  } catch (error) {
    console.error("Error getting flights:", error)
    throw new Error("Failed to fetch Flights")
  }
}
