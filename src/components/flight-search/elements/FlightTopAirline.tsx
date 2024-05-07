"use client"
import { Filter } from "@/components/home/elements/types/flightSearchType"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn, hostedImage } from "@/lib/utils"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React from "react"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectFilterItem } from "@/lib/redux/slice/flight_filter"

import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"

type Props = {
  filterItem: Filter | undefined
}

const FlightTopAirline = () => {
  const dispatch = useAppDispatch()
  let filterItem = useAppSelector(selectFilterItem)
  const filterAirlines =
    useAppSelector(selectFilterOption)?.carrier_operating ?? []

  // handle airline filter
  const handleAirlineFilterChange = (code: string) => {
    let updatedAirlines: string[]
    if (filterAirlines.includes(code)) {
      updatedAirlines = filterAirlines.filter((airline) => airline !== code)
    } else {
      updatedAirlines = [...filterAirlines, code]
    }
    dispatch(setFilterOption({ carrier_operating: updatedAirlines }))
  }

  return (
    <Card className="mb-3 border-none shadow-md md:mb-6">
      <CardContent className="pb-0">
        <Carousel>
          <CarouselContent>
            {filterItem?.airlines &&
              filterItem?.airlines.map((airline) => (
                <CarouselItem
                  className="m-1 flex w-full basis-28 justify-between py-2  md:basis-36"
                  key={airline.airline_code}
                >
                  <button
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "relative flex basis-80 flex-col  text-center"
                    )}
                    onClick={() =>
                      handleAirlineFilterChange(airline.airline_code)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={hostedImage(`/${airline.airline_logo}`)}
                        alt={airline.airline_name}
                        height={30}
                        width={30}
                        objectFit="cover"
                        objectPosition="center"
                      />
                      <p>{airline.airline_code}</p>
                    </div>
                    <p className="text-xs">৳ {airline.price}</p>
                    {filterAirlines.includes(airline.airline_code) && (
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
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </CardContent>
    </Card>
  )
}

export default FlightTopAirline
