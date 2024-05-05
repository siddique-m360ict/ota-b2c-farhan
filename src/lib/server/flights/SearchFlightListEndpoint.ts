import { IFlightSearchList } from "@/components/home/elements/types/flightSearchType"
import { HTTPResponse } from "@/lib/commonTypes"
import { MultiWayFormatter } from "@/lib/formatter/MultiWayFormatter"
import { OneWayFormatter } from "@/lib/formatter/oneWayFormatter"
import { RoundWayFormatter } from "@/lib/formatter/roundWayFormatter"
import { serverUrl } from "@/lib/utils"

export interface IReqFlightSearch {
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

const sanitizeSearchParams = (searchParams) => {
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

export default async function GetFlightList_V1(
  params: IReqFlightSearch
): Promise<HTTPResponse<IFlightSearchList>> {
  const apiUrl = serverUrl("/booking/flight/search/v2?page=1&size=20")
  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  const sanitizeParams = sanitizeSearchParams(params)

  let requestBody

  if (params.route === "oneway") {
    requestBody = OneWayFormatter(sanitizeParams)
  } else if (params.route === "roundway") {
    requestBody = RoundWayFormatter(sanitizeParams)
  } else if (params.route === "multiway") {
    requestBody = MultiWayFormatter(sanitizeParams)
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  })

  console.log(JSON.stringify(requestBody))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}
