"use client"
import FlightTopAirline from "@/components/flight-search/elements/FlightTopAirline"
import FlightTopFilter from "@/components/flight-search/elements/FlightTopFilter"
import FlightTopHeader from "@/components/flight-search/elements/FlightTopHeader"
import FlightListCard from "@/components/flight-search/FlightListCard"
import { useInView } from "react-intersection-observer"
import {
  Filter,
  IFlightSearchList,
  Result,
} from "@/components/home/elements/types/flightSearchType"
import React, { useEffect, useState } from "react"
import FilterSidebar from "@/components/flight-search/elements/FilterSidebar"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setFilterData } from "@/lib/redux/slice/flight_filter"

type Props = {
  flights: Result[]
  filterItems: Filter
  count: number
}
const FlightListView = ({ flights, filterItems, count }: Props) => {
  const dispatch = useAppDispatch()

  if (filterItems) {
    dispatch(setFilterData(filterItems))
  }

  return (
    <div>
      <FlightTopHeader
        totalFlight={count}
        arrivalCity={
          flights[0]?.flights[0]?.options?.[
            flights[0]?.flights[0]?.options?.length - 1
          ].arrival_city_name
        }
      />
      <FlightTopFilter />

      {flights?.map((flight, index) => (
        <div key={index}>
          <FlightListCard flight={flight} />
        </div>
      ))}
    </div>
  )
}

export default FlightListView
