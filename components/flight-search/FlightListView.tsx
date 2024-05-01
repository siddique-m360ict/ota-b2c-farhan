"use client"
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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setFilterData } from "@/lib/redux/slice/flight_filter"
import {
  FilterAirlines,
  selectFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { filterFlightList } from "@/lib/server/flights/FilterFlightListEndpoint"
import LoadingCard from "@/components/flight-search/elements/LoadingCard"

type Props = {
  flights: IFlightSearchList | undefined
  count: number
}
const isFilterNotEmpty = (filter: any) => {
  return Object.values(filter).some((value) => value !== null)
}

const FlightListView = ({ flights, count }: Props) => {
  const dispatch = useAppDispatch()
  const { ref, inView } = useInView()
  const filterOption = useAppSelector(selectFilterOption) as FilterAirlines
  const [filterDataList, setFilterDataList] = useState<
    Result[] | undefined | {} | any
  >(flights?.results)
  const [filterCount, setFilterCount] = useState<number>()
  const [page, setPage] = useState<number>(1)

  if (flights?.filter) {
    dispatch(setFilterData(flights.filter))
  }

  const totalPage = Math.ceil(((filterCount && filterCount) || count || 0) / 20)

  // handle filtering
  useEffect(() => {
    if (isFilterNotEmpty(filterOption)) {
      const filterApi = async () => {
        try {
          const res = await filterFlightList(filterOption, 1)
          setFilterDataList(res?.data?.results)
          setFilterCount(res.count)
          setPage(1)
        } catch (error) {
          throw new Error(`Something wrong in filter`)
        }
      }
      filterApi()
    }
  }, [filterOption])

  // Handle Pagination
  useEffect(() => {
    if (totalPage > page && inView) {
      const searchApi = async () => {
        try {
          const res = await filterFlightList(filterOption, page + 1)
          const filterData = res?.data?.results
          setFilterDataList([...(filterDataList || []), ...(filterData || [])])
          setFilterCount(res?.count)
          setPage((prev) => prev + 1)
        } catch (error) {
          throw new Error(`Something wrong in filter`)
        } finally {
        }
      }
      searchApi()
    }
  }, [inView])

  // console.log(
  //   { totalPage, page },
  //   {
  //     pagination: Math.ceil(((filterCount && filterCount) || count || 0) / 20),
  //   }
  // )
  // console.log(filterDataList)

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
      {filterDataList && (
        <div>
          {filterDataList?.map((flight: any, index: number) => (
            <FlightListCard key={index} flight={flight} />
          ))}
        </div>
      )}
      {totalPage > page ? (
        <div ref={ref}>
          {[0, 1, 2].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-2 flex items-center justify-center">
          <div className="rounded-md p-2">
            <p className="text-xs text-gray-600">No more results found</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FlightListView
