"use client"

import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

import { filterFlightList } from "@/app/(flightSearch)/actions"
import {
  setFilterCount,
  setFilterDataList,
  selectFilterDataCount,
  selectFilterDataList,
} from "@/lib/redux/slice/filterDataList"
import FlightTopFilter from "@/components/flight-search/elements/FlightTopFilter"
import FlightTopHeader from "@/components/flight-search/elements/FlightTopHeader"
import FlightListCard from "@/components/flight-search/FlightListCard"
import FlightTopAirline from "@/components/flight-search/elements/FlightTopAirline"

import {
  IFlightSearchList,
  Result,
} from "@/components/home/elements/types/flightSearchType"
import {
  FilterAirlines,
  selectFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { setFilterData } from "@/lib/redux/slice/flight_filter"
import FlightLocationHeader from "./elements/FlightLocationHeader"
import LoadingIndicator from "../common/spinner/LoadingIndicator"
import useGlobalTransition from "@/hooks/useGlobalTransition"
import { selectTransitionIsPending } from "@/lib/redux/slice/transitionLoading"

type Props = {
  flights: IFlightSearchList | undefined
  count: number
}

const isFilterNotEmpty = (filter: FilterAirlines) =>
  Object.values(filter).some((value) => value !== null)

const FlightListView = ({ flights, count }: Props) => {
  const dispatch = useAppDispatch()
  const filterOption = useAppSelector(selectFilterOption) as FilterAirlines
  const filterCount = useAppSelector(selectFilterDataCount)
  const filterDataList = useAppSelector(selectFilterDataList)
  const loading = useAppSelector(selectTransitionIsPending)

  useEffect(() => {
    if (flights?.filter) {
      dispatch(setFilterData(flights.filter))
    }
  }, [flights, dispatch])

  useEffect(() => {
    if (isFilterNotEmpty(filterOption)) {
      const fetchFilteredData = async () => {
        try {
          const res = await filterFlightList(filterOption, 1)
          if (res?.data?.results) {
            dispatch(setFilterDataList(res.data.results))
            dispatch(setFilterCount(res.count))
          }
        } catch (error) {
          console.error("Error fetching filtered data:", error)
        }
      }

      fetchFilteredData()
    }
  }, [filterOption, dispatch])

  const departureLocation =
    filterDataList?.[0]?.leg_descriptions?.[0]?.departureLocation ||
    flights?.results?.[0]?.leg_descriptions?.[0]?.departureLocation
  const arrivalLocation =
    filterDataList?.[0]?.leg_descriptions?.[0]?.arrivalLocation ||
    flights?.results?.[0]?.leg_descriptions?.[0]?.arrivalLocation
  const departureDate =
    filterDataList?.[0]?.leg_descriptions?.[0]?.departureDate ||
    flights?.results?.[0]?.leg_descriptions?.[0]?.departureDate
  const arrivalDate =
    filterDataList?.[0]?.leg_descriptions?.[0]?.departureDate ||
    flights?.results?.[0]?.leg_descriptions?.[0]?.departureDate

  return (
    <div>
      <div className="hidden px-2 md:block md:px-0 lg:w-[65vw] xl:w-[72vw] 2xl:w-[55vw]">
        <FlightTopAirline />
      </div>

      <div className="hidden md:block">
        <FlightTopHeader
          totalFlight={filterCount ?? count}
          arrivalCity={
            flights?.results?.[0]?.flights?.[0]?.options?.[
              flights.results[0]?.flights[0]?.options?.length - 1
            ].arrival?.city
          }
        />
        <FlightTopFilter />
      </div>

      <div className="block md:hidden">
        <FlightLocationHeader
          departureLocation={departureLocation}
          arrivalLocation={arrivalLocation}
          departureDate={departureDate}
          arrivalDate={arrivalDate}
          totalFlight={filterCount ?? count}
        />
      </div>

      <div>
        {filterDataList
          ? filterDataList.map((flight: Result, index: number) => (
              <FlightListCard key={index} flight={flight} />
            ))
          : flights?.results.map((flight: Result, index: number) => (
              <FlightListCard key={index} flight={flight} />
            ))}
      </div>
      {loading && <LoadingIndicator />}
    </div>
  )
}

export default FlightListView
