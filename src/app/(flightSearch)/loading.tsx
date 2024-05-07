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
import DepartureTime from "@/components/flight-search/elements/DepartureTime"
import ArrivalTime from "@/components/flight-search/elements/ArrivalTime"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"

const loading = () => {
  const dummyFilter = {
    total_stoppage: [0, 1, 2],
    price_rage: {
      max: 1737064,
      min: 792309,
    },
    airlines: [
      {
        airline_code: "EK",
        airline_logo: "airlines/EK.png",
        airline_name: "Emirates",
        price: 792309,
      },
      {
        airline_code: "AI",
        airline_logo: "airlines/AI.png",
        airline_name: "Air India",
        price: 1138253,
      },
      {
        airline_code: "QR",
        airline_logo: "airlines/QR.png",
        airline_name: "Qatar Airways",
        price: 1321170,
      },
      {
        airline_code: "CX",
        airline_logo: "airlines/CX.png",
        airline_name: "Cathay Pacific Airways",
        price: 1323487,
      },
      {
        airline_code: "KU",
        airline_logo: "airlines/KU.png",
        airline_name: "Kuwait Airways",
        price: 1551527,
      },
      {
        airline_code: "TK",
        airline_logo: "airlines/TK.png",
        airline_name: "Turkish Airlines",
        price: 1480624.6,
      },
      {
        airline_code: "EY",
        airline_logo: "airlines/EY.png",
        airline_name: "Etihad Airways",
        price: 1737064,
      },
    ],
  }
  return (
    <div className="">
      <div className="mb-6 mt-1">
        <div className="flex h-[50px] w-full items-center justify-between overflow-x-scroll whitespace-nowrap rounded-xl  bg-secondaryBg shadow-md md:overflow-auto md:overflow-y-hidden md:whitespace-normal">
          {dummyFilter.airlines.map((airline, index) => (
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
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block ">
          <RefundableNonRefund />
          <Separator orientation="horizontal" className="my-4 h-[1px] w-full" />
          <FilterAirline Airlines={dummyFilter.airlines} />
          <Separator orientation="horizontal" className="my-5 h-[1px] w-full" />
          <PriceRangeFilter price={dummyFilter?.price_rage} />
          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />

          <Stoppage filter={dummyFilter?.total_stoppage} />
          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />
          <h3 className="mb-4 font-bold text-secondary">Times</h3>
          <DepartureTime />
          <ArrivalTime />
          <Separator
            orientation="horizontal"
            className=" my-5 h-[1px] w-full"
          />
        </aside>
        <div>
          <div className="mb-3">
            <FlightTopHeader totalFlight={0} arrivalCity={"UNITED STATES"} />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 9 }, (_, index) => (
              <Skeleton key={index} className="h-[90px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
      <LoadingIndicator />
    </div>
  )
}

export default loading
