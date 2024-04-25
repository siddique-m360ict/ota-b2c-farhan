"use client"
import { Filter } from "@/components/home/elements/types/flightSearchType"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn, hostedImage } from "@/lib/utils"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import React, { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectFilterItem } from "@/lib/redux/slice/flight_filter"
import {
  selectFilterAirline,
  setFilterAirline,
} from "@/lib/redux/slice/filterAirline"

type Props = {
  filterItem: Filter | undefined
}

const FlightTopAirline = () => {
  const params = useSearchParams()
  const router = useRouter()
  const queryParams = new URLSearchParams(params?.toString())
  const dispatch = useAppDispatch()
  let filterItem = useAppSelector(selectFilterItem)
  const filterAirlines = useAppSelector(selectFilterAirline) ?? []

  // get carrier_operating params to search params
  useEffect(() => {
    const carrierMarketingParam = queryParams.get("carrier_operating")
    if (carrierMarketingParam) {
      const selectedAirlines = carrierMarketingParam.split(",")
      dispatch(setFilterAirline(selectedAirlines))
    }
  }, [params])

  // update multiple params
  const updatePageParameter = (url: string, selectedAirlines: string[]) => {
    const queryString = selectedAirlines.join(",")
    if (url.includes("&carrier_operating=")) {
      url = url.replace(
        /&carrier_operating=[^&]*/,
        `&carrier_operating=${queryString}`
      )
    } else {
      url += `&carrier_operating=${queryString}`
    }
    return url
  }

  // handle airline filter
  const handleAirlineFilterChange = (code: string) => {
    let updatedAirlines: string[]
    if (filterAirlines.includes(code)) {
      updatedAirlines = filterAirlines.filter((airline) => airline !== code)
    } else {
      updatedAirlines = [...filterAirlines, code]
    }
    // update airline filter in filterAirline slice
    dispatch(setFilterAirline(updatedAirlines))
    if (window !== undefined) {
      let baseURL = `${window.location.pathname}?${queryParams.toString()}`
      const newBaseURL = updatePageParameter(baseURL, updatedAirlines)
      router.replace(newBaseURL)
    }
  }

  return (
    <Card className="mb-6 border-none shadow-md">
      <CardContent className="pb-0">
        <Carousel>
          <CarouselContent>
            {filterItem?.airlines &&
              filterItem?.airlines.map((airline) => (
                <CarouselItem
                  className="m-1 flex w-full basis-36 justify-between  py-2"
                  key={airline.carrier_marketing}
                >
                  <button
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "relative  basis-80 text-center"
                    )}
                    onClick={() =>
                      handleAirlineFilterChange(airline.carrier_marketing)
                    }
                  >
                    <Image
                      src={hostedImage(`/${airline.logo}`)}
                      alt={airline.name}
                      height={30}
                      width={30}
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <p>{airline.name}</p>
                    {filterAirlines.includes(airline.carrier_marketing) && (
                      <Separator
                        orientation="horizontal"
                        className=" absolute bottom-[-14px] right-2 h-[2px] w-full bg-secondary "
                      />
                    )}
                  </button>
                  <Separator
                    orientation="vertical"
                    className="h-[3.5vh] w-[1px] "
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  )
}

export default FlightTopAirline
