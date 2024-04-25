import {
  FilterAirlines,
  IFlightSearchList,
} from "@/components/home/elements/types/flightSearchType"
import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"

export async function filterFlightList(
  filter: FilterAirlines,
  page: number
): Promise<HTTPResponse<IFlightSearchList>> {
  // Structuring URL
  let apiUrl = serverUrl(`/booking/flight/filter?page=${page}&size=20`)

  if (filter.carrier_operating) {
    apiUrl += `&carrier_operating=${filter.carrier_operating}`
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
  if (filter.stoppage) {
    apiUrl += `&stoppage=${filter.stoppage}`
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
  if (filter.type) {
    apiUrl += `&sort_by=${filter.type}`
  }

  let myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: myHeaders,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}
