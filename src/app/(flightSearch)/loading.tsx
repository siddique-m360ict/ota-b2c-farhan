"use client"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { cn, hostedImage } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import FlightTopHeader from "@/components/flight-search/elements/FlightTopHeader"
import RefundableNonRefund from "@/components/flight-search/elements/RefundableNonRefund"
import FilterAirline from "@/components/flight-search/elements/FilterAirline"
import PriceRangeFilter from "@/components/flight-search/elements/PriceRangeFilter"
import Stoppage from "@/components/flight-search/elements/Stoppage"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import FlightLocationHeader from "@/components/flight-search/elements/FlightLocationHeader"
import MobileFlightCard from "@/components/flight-search/elements/MobileFlightCard"
import FlightListCard from "@/components/flight-search/FlightListCard"
import dummyFlights from "../../../public/data/dummyFlight.json"
import { Result } from "@/components/home/elements/types/flightSearchType"
import TimeCounter from "@/components/common/TimeCounter"
import TimeFilter from "@/components/flight-search/elements/timeFilter/TimeFilter"
import BaggageFilter from "@/components/flight-search/elements/BaggageFilter"
const Loading = () => {
  const filterItem = {
    total_stoppage: [[0, 1, 2]],
    price_rage: {
      max: 341350.31,
      min: 32550,
    },
    airlines: [
      {
        airline_code: "BS",
        airline_logo: "airlines/BS.png",
        airline_name: "US-Bangla Airlines",
        price: 32550,
      },
      {
        airline_code: "BG",
        airline_logo: "airlines/BG.png",
        airline_name: "Biman Bangladesh Airlines",
        price: 33691.36,
      },
      {
        airline_code: "AI",
        airline_logo: "airlines/AI.png",
        airline_name: "Air India",
        price: 35526.82,
      },
      {
        airline_code: "SV",
        airline_logo: "airlines/SV.png",
        airline_name: "Saudi Airlines",
        price: 61844.22,
      },
      {
        airline_code: "QR",
        airline_logo: "airlines/QR.png",
        airline_name: "Qatar Airways",
        price: 63516,
      },
      {
        airline_code: "SQ",
        airline_logo: "airlines/SQ.png",
        airline_name: "Singapore Airlines",
        price: 110809.53,
      },
      {
        airline_code: "TK",
        airline_logo: "airlines/TK.png",
        airline_name: "Turkish Airlines",
        price: 128741,
      },
    ],
    baggage: ["30 kg", "1 pieces", "25 kg", "20 kg"],
    departure_time: [
      {
        min: "2024-08-03T02:35:00+06:00",
        max: "2024-08-03T23:55:00+06:00",
        airport: "Dhaka - BANGLADESH",
      },
    ],
    arrival_time: [
      {
        min: "2024-08-03T10:15:00+04:00",
        max: "2024-08-04T18:25:00+04:00",
      },
    ],
  }

  return (
    <div className="md:mt-4">
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block ">
          <TimeCounter />
          <RefundableNonRefund />
          <Separator orientation="horizontal" className="my-4 h-[1px] w-full" />
          <FilterAirline Airlines={filterItem?.airlines} />
          <Separator orientation="horizontal" className="my-5 h-[1px] w-full" />
          <PriceRangeFilter price={filterItem?.price_rage} />

          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />
          <TimeFilter />
          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />
          <Stoppage filter={filterItem?.total_stoppage} />
          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />
          <BaggageFilter baggageOptions={filterItem.baggage} />
          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />
        </aside>
        <div className="hidden md:block">
          <div className="mb-6 mt-1 ">
            <div className="flex h-[50px] w-full items-center justify-between overflow-x-scroll whitespace-nowrap rounded-xl  bg-secondaryBg shadow-md md:overflow-auto md:overflow-y-hidden md:whitespace-normal">
              {filterItem.airlines.map((airline, index) => (
                <div
                  key={index}
                  className="m-1 flex w-full basis-28 justify-between py-2 md:basis-48"
                >
                  <button
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "relative flex basis-80 flex-col  text-center"
                    )}
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
                  </button>
                  <Separator
                    orientation="vertical"
                    className="h-[3.5vh] w-[1px] "
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <FlightTopHeader totalFlight={0} arrivalCity={"UNITED STATES"} />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 9 }, (_, index) => (
              <Skeleton key={index} className="h-[90px] w-full rounded-xl" />
            ))}
          </div>
        </div>
        <div className="block md:hidden">
          <FlightLocationHeader
            departureLocation={"DAC"}
            arrivalLocation={"JFK"}
            departureDate={"15-05-2024"}
            arrivalDate={"15-05-2024"}
            totalFlight={50}
          />

          {dummyFlights.map((flight: any, index: number) => (
            <FlightListCard key={index} flight={flight} />
          ))}
        </div>
      </div>
      <LoadingIndicator />
    </div>
  )
}

export default Loading
