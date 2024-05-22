import { Icons } from "@/components/icons"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAppDispatch } from "@/lib/redux/hooks"
import {
  setFilterCount,
  setFilterDataList,
} from "@/lib/redux/slice/filterDataList"
import { removeFilterOption } from "@/lib/redux/slice/filterOptions"
import { addDays, format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const data = [
  {
    id: 1,
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 2061,
      country_id: 18,
      country: "BANGLADESH",
      name: "Cox's Bazar Airport",
      iata_code: "CXB",
      city: "Cox's Bazar",
    },
    img: "/images/home/routes/cox.jpg",
    formDate: addDays(new Date(), 2),
    toDate: addDays(new Date(), 5),
  },
  {
    id: 2,
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 209,
      country_id: 18,
      country: "BANGLADESH",
      name: "Chittagong-Shah Amanat International Airport",
      iata_code: "CGP",
      city: "Chittagong",
    },
    img: "/images/home/routes/chittagong.jpg",
    formDate: addDays(new Date(), 3),
    toDate: addDays(new Date(), 5),
  },
  {
    id: 3,
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 212,
      country_id: 18,
      country: "BANGLADESH",
      name: "Sylhet-Osmani International Airport",
      iata_code: "ZYL",
      city: "Sylhet",
    },
    img: "/images/home/routes/sylhet.jpg",
    formDate: addDays(new Date(), 2),
    toDate: addDays(new Date(), 5),
  },
  {
    id: 4,
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 208,
      country_id: 18,
      country: "BANGLADESH",
      name: "Barishal Airport",
      iata_code: "BZL",
      city: "Barishal",
    },
    img: "/images/home/routes/barisal.jpg",
    formDate: addDays(new Date(), 4),
    toDate: addDays(new Date(), 7),
  },
  {
    id: 5,
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 2062,
      country_id: 18,
      country: "BANGLADESH",
      name: "Saidpur Airport",
      iata_code: "SPD",
      city: "Saidpur",
    },
    img: "/images/home/routes/spd.jpg",
    formDate: addDays(new Date(), 4),
    toDate: addDays(new Date(), 7),
  },
]

const BangladeshRoutes = () => {
  const passenger = {
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  }
  const dispatch = useAppDispatch()

  const queryParams = (fromAirport, toAirport, formDate, toDate) => {
    return `origin=${fromAirport.iata_code}&destination=${
      toAirport.iata_code
    }&departuredate=${
      formDate ? format(new Date(formDate), "yyyy-MM-dd") : ""
    }&returndate=${
      toDate ? format(new Date(toDate), "yyyy-MM-dd") : ""
    }&adults=${passenger.adult}&class=Y&route=roundway`
  }

  const routeSave = (fromAirport, toAirport, formDate, toDate) => {
    const saveLocalStorage = {
      fromAirport,
      toAirport,
      date: { from: formDate, to: toDate },
    }
    localStorage.setItem("roundWayFlights", JSON.stringify(saveLocalStorage))
    localStorage.setItem("route", "roundtrip")
    localStorage.setItem("class", "Y")
    localStorage.setItem("passenger", JSON.stringify(passenger))
    dispatch(setFilterDataList(undefined))
    dispatch(setFilterCount(undefined))
    dispatch(removeFilterOption())
  }
  return (
    <Card className="grid grid-cols-2 gap-2 border-none bg-transparent px-0 md:grid-cols-5  md:gap-4">
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/flightsearch?${queryParams(
            item.from,
            item.to,
            item.formDate,
            item.toDate
          )}`}
          onClick={() =>
            routeSave(item.from, item.to, item.formDate, item.toDate)
          }
        >
          <CardContent className="w-full rounded-b bg-secondaryBg p-0 shadow-none">
            <div className="relative h-[200px] w-full ">
              <Image
                src={item.img}
                alt="home-image"
                layout="fill"
                className="rounded-t-lg object-cover"
              />
            </div>

            <div className="px-2 pt-5 md:px-4">
              <div className="relative grid grid-cols-2 gap-8">
                <div>
                  <p className="my-1 text-xs xl:text-sm 2xl:text-[16px]">
                    {item.from.city}
                  </p>
                  <p className="mt-[2px] truncate text-sm text-destructive">
                    {item.from.name}
                  </p>
                </div>

                <Icons.ArrowLeftRight className="absolute left-[44%] z-50 hidden h-7 w-7 cursor-pointer rounded-full p-1.5 text-sm font-bold transition-all duration-150 md:block" />
                <div className="text-end">
                  <p className="my-1 text-xs xl:text-sm 2xl:text-[16px]">
                    {item.to.city}
                  </p>
                  <p className="mt-[3px] truncate text-sm text-destructive">
                    {item.to.name}
                  </p>
                </div>
              </div>
            </div>
            <CardFooter className="m-0 my-3 flex justify-end bg-transparent px-2 pb-3 pt-0 shadow-none md:px-4">
              <div>
                <p className="text-center text-xs text-destructive md:my-4 xl:text-xs 2xl:text-sm">
                  {format(item.formDate, "PPP")} - {format(item.toDate, "PPP")}
                </p>
              </div>
            </CardFooter>
          </CardContent>
        </Link>
      ))}
    </Card>
  )
}

export default BangladeshRoutes
