"use client"
import FlightTopFilter from "@/components/flight-search/elements/FlightTopFilter"
import FlightTopHeader from "@/components/flight-search/elements/FlightTopHeader"
import FlightListCard from "@/components/flight-search/FlightListCard"
import {
  Filter,
  IFlightSearchList,
  Result,
} from "@/components/home/elements/types/flightSearchType"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setFilterData } from "@/lib/redux/slice/flight_filter"
import {
  FilterAirlines,
  selectFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { filterFlightList } from "@/lib/server/flights/FilterFlightListEndpoint"

type Props = {
  flights: IFlightSearchList | undefined
  count: number
}
const isFilterNotEmpty = (filter: any) => {
  return Object.values(filter).some((value) => value !== null)
}
const FlightListView = ({ flights, count }: Props) => {
  const dispatch = useAppDispatch()
  const filterOption = useAppSelector(selectFilterOption) as FilterAirlines
  const [filterDataList, setFilterDataList] = useState<
    Result[] | undefined | {} | any
  >()
  const [filterCount, setFilterCount] = useState<number>()

  if (flights?.filter) {
    dispatch(setFilterData(flights.filter))
  }

  // handle filtering
  useEffect(() => {
    if (isFilterNotEmpty(filterOption)) {
      const filterApi = async () => {
        try {
          const res = await filterFlightList(filterOption, 1)
          setFilterDataList(res?.data?.results)
          setFilterCount(res.count)
        } catch (error) {
          throw new Error(`Something wrong in filter`)
        }
      }
      filterApi()
    }
  }, [filterOption])

  return (
    <div>
      <FlightTopHeader
        totalFlight={filterCount || filterCount == 0 ? filterCount : count}
        arrivalCity={
          flights?.results[0]?.flights[0]?.options?.[
            flights.results[0]?.flights[0]?.options?.length - 1
          ].arrival?.city
        }
      />
      <FlightTopFilter />

      <div>
        {filterDataList
          ? filterDataList.map((flight: any, index: number) => (
              <FlightListCard key={index} flight={flight} />
            ))
          : flights?.results.map((flight: any, index: number) => (
              <FlightListCard key={index} flight={flight} />
            ))}
      </div>
    </div>
  )
}

export default FlightListView
