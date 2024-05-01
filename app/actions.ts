"use server"

import { format } from "date-fns"
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

export const OneWayFormatter = (query: IReqFlightSearch) => {
  const formattedQuery = {
    OriginDestinationInformation: [
      {
        RPH: "1",
        DepartureDateTime: query.departuredate
          ? format(new Date(query.departuredate), "yyyy-MM-dd'T'HH:mm:ss")
          : "no date formate",
        OriginLocation: {
          LocationCode: query.origin,
        },
        DestinationLocation: {
          LocationCode: query.destination,
        },
        TPA_Extensions: {
          CabinPref: {
            Cabin: query.class?.toUpperCase(),
            PreferLevel: "Preferred",
          },
        },
      },
    ],
    PassengerTypeQuantity: [
      {
        Code: "ADT",
        Quantity: Number(query.adults || 1) || 1,
      },
    ],
  }
  if (Number(query.child || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "C11",
      Quantity: Number(query.child),
    })
  }

  if (Number(query.infant || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "INY",
      Quantity: Number(query.infant),
    })
  }
  if (Number(query.kids || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "C05",
      Quantity: Number(query.kids),
    })
  }
  return formattedQuery
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

export const getAllFlights = async (params: IReqFlightSearch) => {
  try {
    const apiUrl =
      "https://booking-expert.m360ictapi.com/api/v1/booking/flight/search/v2?page=1&size=20"
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const sanitizeParams = sanitizeSearchParams(params)

    let requestBody
    if (params.route === "oneway") {
      requestBody = OneWayFormatter(sanitizeParams)
    }

    const body = {
      OriginDestinationInformation: [
        {
          RPH: "1",
          DepartureDateTime: "2024-05-03T06:00:00",
          OriginLocation: { LocationCode: "DAC" },
          DestinationLocation: { LocationCode: "CXB" },
          TPA_Extensions: {
            CabinPref: { Cabin: "Y", PreferLevel: "Preferred" },
          },
        },
      ],
      PassengerTypeQuantity: [{ Code: "ADT", Quantity: 1 }],
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestBody),
    })
    console.log(JSON.stringify(requestBody))

    return response.json()
  } catch (error) {
    console.error("Error getting flights:", error)
    throw new Error("Failed to fetch Flights")
  }
}
