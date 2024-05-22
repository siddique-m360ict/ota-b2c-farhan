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
      id: 1754,
      country_id: 226,
      country: "UNITED STATES",
      name: "New York - John F. Kennedy International Airport",
      iata_code: "JFK",
      city: "New York",
    },
    img: "/images/home/routes/international/newyork.jpg",
    formDate: addDays(new Date(), 15),
    toDate: addDays(new Date(), 30),
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
      id: 1349,
      country_id: 224,
      country: "UNITED ARAB EMIRATES",
      name: "Dubai - Dubai International Airport",
      iata_code: "DXB",
      city: "Dubai",
    },
    img: "/images/home/routes/international/Dubai.jpg",
    formDate: addDays(new Date(), 10),
    toDate: addDays(new Date(), 18),
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
      id: 1922,
      country_id: 226,
      country: "UNITED STATES",
      name: "Washington DC - Dulles International",
      iata_code: "IAD",
      city: "Washington",
    },
    img: "/images/home/routes/international/Washington.jpg",
    formDate: addDays(new Date(), 14),
    toDate: addDays(new Date(), 27),
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
      id: 1386,
      country_id: 225,
      country: "UNITED KINGDOM",
      name: "London - Heathrow",
      iata_code: "LHR",
      city: "London",
    },
    img: "/images/home/routes/international/London.jpg",
    formDate: addDays(new Date(), 17),
    toDate: addDays(new Date(), 29),
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
      id: 1142,
      country_id: 187,
      country: "SAUDI ARABIA",
      name: "Madinah (Medina) - Mohammad Bin Abdulaziz",
      iata_code: "MED",
      city: "Medina",
    },
    img: "/images/home/routes/international/Medina.jpg",
    formDate: addDays(new Date(), 15),
    toDate: addDays(new Date(), 24),
  },
]

const InternationalRoutes = () => {
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
    <Card className="grid grid-cols-2 gap-2 border-none bg-transparent px-0 md:grid-cols-5 md:gap-4">
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
          <CardContent className="w-full bg-secondaryBg p-0 shadow-xl">
            <div className="relative h-[200px] w-full ">
              <Image
                src={item.img}
                alt="home-image"
                layout="fill"
                className="rounded-t-lg object-cover"
              />
            </div>

            <div className="px-4 pt-5">
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
            <CardFooter className="m-0 my-3 flex justify-end gap-1 px-4 pb-3 pt-0">
              <div>
                <p className="my-4 text-center text-sm text-destructive">
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

export default InternationalRoutes
