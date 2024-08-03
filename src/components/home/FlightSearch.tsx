"use client"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { Card, CardContent } from "../ui/card"
import MultiCity from "./elements/MultiCity"
import OneWay from "./elements/OneWay"
import RoundWay from "./elements/RoundWay"
import SelectClass from "./elements/SelectClass"
import SelectPassenger from "./elements/SelectPassenger"
import SelectRoute from "./elements/SelectRoute"
import { CappingAirlines, FancyMultiSelect } from "./elements/FancyMultiSelect"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectCapAirline,
  setCappingAirlineList,
} from "@/lib/redux/slice/cappingAirline"
import { useRouter } from "next/navigation"

export interface Passenger {
  adult: number
  kids: number
  children: number
  infant: number
}

type Props = {
  home?: boolean
  className?: string
}
const FlightSearch = ({ home, className }: Props) => {
  const [passenger, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  })
  const [cabinClass, setCabinClass] = useState<string>("Y")

  const [activeRoute, setActiveRoute] = useState("roundtrip")
  const router = useRouter()
  const routeContent = [
    {
      id: "oneway",
      element: <OneWay cabinClass={cabinClass} passenger={passenger} />,
    },
    {
      id: "roundtrip",
      element: <RoundWay cabinClass={cabinClass} passenger={passenger} />,
    },
    {
      id: "multicity",
      element: <MultiCity cabinClass={cabinClass} passenger={passenger} />,
    },
  ]

  useEffect(() => {
    const localRoute = localStorage.getItem("route")
    const localClass = localStorage.getItem("class")
    const localPassenger = JSON.parse(localStorage.getItem("passenger"))
    localRoute && setActiveRoute(localRoute)
    localClass && setCabinClass(localClass)
    localPassenger && setPassenger(localPassenger)
  }, [])

  return (
    <Card className={cn(!home && "shadow-xl", className)}>
      <CardContent
        className={cn("px-4 text-start md:px-6 md:pt-11", !home && "md:pt-4")}
      >
        <div className="items-center justify-between gap-3 md:flex">
          <div className="mb-3 mt-1 flex flex-wrap items-center justify-between md:justify-start md:gap-5">
            <SelectRoute
              activeRoute={activeRoute}
              setActiveRoute={setActiveRoute}
            />
            <SelectPassenger
              setPassenger={setPassenger}
              passenger={passenger}
            />
            <SelectClass
              cabinClass={cabinClass}
              setCabinClass={setCabinClass}
            />
          </div>
          {/* <div>
            <FancyMultiSelect />
          </div> */}
        </div>

        {routeContent.map(
          (route, index) =>
            route.id === activeRoute && <div key={index}>{route.element}</div>
        )}
      </CardContent>
    </Card>
  )
}

export default FlightSearch
