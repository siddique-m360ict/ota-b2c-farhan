import React, { useEffect, useState, useTransition } from "react"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import FlightSearch from "@/components/home/FlightSearch"
import TimeCounter from "@/components/common/TimeCounter"
import FilterSidebar from "./FilterSidebar"
import RefundableNonRefund from "./RefundableNonRefund"
import FilterAirline from "./FilterAirline"
import PriceRangeFilter from "./PriceRangeFilter"
import Stoppage from "./Stoppage"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectFilterItem } from "@/lib/redux/slice/flight_filter"
import { buttonVariants } from "@/components/ui/button"
import {
  selectModifyFlightDrawerOpen,
  setModifyFlightDrawerOpen,
} from "@/lib/redux/slice/ModifyFlightSearchDrawer"
import { selectTransitionIsPending } from "@/lib/redux/slice/transitionLoading"
import TimeFilter from "./timeFilter/TimeFilter"

type FlightLocationProps = {
  departureLocation: string | undefined
  arrivalLocation: string | undefined
  departureDate: string | undefined
  arrivalDate: string | undefined
  totalFlight: number
}

type PassengerData = {
  adult: number
  kids: number
  children: number
  infant: number
}

const FlightLocationHeader = ({
  departureLocation,
  arrivalLocation,
  departureDate,
  arrivalDate,
  totalFlight,
}: FlightLocationProps) => {
  const [passengerData, setPassengerData] = useState<PassengerData>({
    adult: 0,
    kids: 0,
    children: 0,
    infant: 0,
  })
  const [route, setRoute] = useState<string>()
  const router = useRouter()
  const open = useAppSelector(selectModifyFlightDrawerOpen)
  const dispatch = useAppDispatch()
  const [filterOpen, setFilterOpen] = useState(false)
  let filterItem = useAppSelector(selectFilterItem)

  useEffect(() => {
    const storedPassengerData = localStorage.getItem("passenger")
    const route = localStorage.getItem("route")
    if (storedPassengerData) {
      setPassengerData(JSON.parse(storedPassengerData))
    }
    if (route) {
      setRoute(route)
    }
  }, [departureLocation, arrivalLocation, departureDate, arrivalDate])

  const totalTravelers =
    passengerData.adult +
    passengerData.kids +
    passengerData.children +
    passengerData.infant

  const handlePrev = () => {
    router.push("/flights")
  }

  return (
    <>
      <div className="flex items-center justify-between bg-primary px-4 py-2 text-white">
        <div className="flex items-center gap-3">
          <div onClick={handlePrev}>
            <Icons.ArrowLeft size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {departureLocation}
              <Separator className="h-px w-6" />
              {arrivalLocation}
            </div>
            <div className="flex items-center justify-center gap-2 leading-4">
              <div className="flex items-center gap-1 text-[10px]">
                <p>{departureDate}</p>
                <Separator className="h-px w-2" />
                <p>{arrivalDate}</p>
              </div>
              <span className="text-xs text-destructive">|</span>
              <span className="text-[10px]">{totalTravelers} Travelers</span>
              <span className="text-[10px] capitalize">{route}</span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <Drawer
            open={open}
            onOpenChange={(isOpen) =>
              dispatch(setModifyFlightDrawerOpen(isOpen))
            }
          >
            <DrawerTrigger asChild>
              <p>
                <Icons.Pencil />
              </p>
            </DrawerTrigger>
            <DrawerContent className="h-auto bg-card">
              <div className="mt-">
                <FlightSearch className="border-0 pt-8 shadow-none" />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="time">
        <TimeCounter className="rounded-none bg-[#1884ffb2] p-1 px-4 text-xs text-white" />
      </div>

      <div className="mb-3 flex items-center justify-between px-3">
        <div>
          <p className="text-[15px] font-[600] text-secondary">
            {totalFlight} Available Flights
          </p>
        </div>

        <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
          <DrawerTrigger asChild>
            <div className="flex items-center gap-2 rounded-full bg-secondaryBg px-3 py-[7px]">
              <Icons.SlidersHorizontal
                size={14}
                className="font-bold text-primary"
              />
              <p className="text-xs">All Filters</p>
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-auto min-h-screen bg-card">
            <div className="mb-3 mt-6 flex justify-between px-6">
              <h2 className="font-bold text-primary">Filter</h2>
              <p className="py-1 " onClick={() => setFilterOpen(false)}>
                <Icons.check size={22} />
              </p>
            </div>
            <div className="px-6">
              <RefundableNonRefund />
              <Separator
                orientation="horizontal"
                className="my-4 h-px w-full"
              />
              <FilterAirline Airlines={filterItem?.airlines} />
              <Separator
                orientation="horizontal"
                className="my-5 h-px w-full"
              />
              <Stoppage filter={filterItem?.total_stoppage} />
              <Separator
                orientation="horizontal"
                className=" my-5 h-px w-full"
              />
              <PriceRangeFilter price={filterItem?.price_rage} />
              <Separator
                orientation="horizontal"
                className=" my-5 h-px w-full"
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export default FlightLocationHeader
