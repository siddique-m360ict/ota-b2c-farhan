"use client"
import { cn } from "@/lib/utils"
import React, { useEffect, useState, useTransition } from "react"
import { Card, CardContent } from "../ui/card"
import SelectPassenger from "../home/elements/SelectPassenger"
import City from "../flight-revalidate/elements/PNRForm/City"
import SelectCountry from "./elements/SelectCountry"
import DatePickerRange from "../home/elements/DatePickerRange"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Button, buttonVariants } from "../ui/button"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "../ui/use-toast"
import LoadingIndicator from "../common/spinner/LoadingIndicator"

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
const VisaSearchBox = ({ home, className }: Props) => {
  const [passenger, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  })

  const [selectedCountry, setSelectedCountry] = useState<{
    id: number
    name: string
    iso: string
  } | null>({
    id: 224,
    name: "UNITED ARAB EMIRATES",
    iso: "AE",
  })
  const [selectedNationality, setSelectedNationality] = useState<{
    id: number
    name: string
    iso: string
  } | null>({
    id: 38,
    name: "CANADA",
    iso: "CA",
  })
  const [selectedResidenceCountry, setSelectedResidenceCountry] = useState<{
    id: number
    name: string
    iso: string
  } | null>({
    id: 18,
    name: "BANGLADESH",
    iso: "BD",
  })

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 20),
  })

  // react hook
  const [isPending, startTransition] = useTransition()
  const segment = useSelectedLayoutSegment()
  const pathName = usePathname()
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Make url
  const queryParams = `country_id=${selectedCountry.id}&departuredate=${
    date?.from ? format(new Date(date.from), "yyyy-MM-dd") : ""
  }&returndate=${
    date?.to ? format(new Date(date.to), "yyyy-MM-dd") : ""
  }&adults=${passenger.adult}${
    passenger.children !== 0 ? `&child=${passenger.children}` : ""
  }${passenger.infant !== 0 ? `&infant=${passenger.infant}` : ""}${
    passenger.kids !== 0 ? `&kids=${passenger.kids}` : ""
  }`

  const addData = () => {
    const saveLocalStorage = {
      selectedCountry,
      selectedNationality,
      selectedResidenceCountry,
      passenger,
      date,
    }
    localStorage.setItem("visaSearch", JSON.stringify(saveLocalStorage))
  }

  // ==================== get flight search localStorage info
  useEffect(() => {
    if (window !== undefined) {
      const searchVisa = JSON.parse(localStorage.getItem("visaSearch"))
      if (searchVisa && Object.keys(searchVisa).length > 0) {
        setSelectedCountry(searchVisa?.selectedCountry)
        setSelectedNationality(searchVisa?.selectedNationality)
        setSelectedResidenceCountry(searchVisa?.selectedResidenceCountry)
        setPassenger(searchVisa.passenger)
        setDate({
          from: new Date(searchVisa.date.from),
          to: new Date(searchVisa.date.to),
        })
      }
    }
  }, [segment])

  const changeRoute = () => {
    addData()
    router.push(`/searchVisa?${queryParams}`)
    router.refresh()
  }
  return (
    <>
      <Card className={cn(!home && "shadow-xl", className)}>
        <CardContent
          className={cn("px-4 text-start md:px-6 md:pt-11", !home && "md:pt-4")}
        >
          <div className="mb-[7px] mt-1 flex items-center justify-between md:justify-start md:gap-5">
            <p className=" p-0 font-heading text-destructive">Search Visa</p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-2">
            <div className="relative grid w-full gap-3 md:flex md:gap-2">
              <SelectCountry
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                type="Country"
              />

              <DatePickerRange date={date} setDate={setDate} visaPage={true} />
            </div>
            <div className="flex flex-col gap-2 md:flex-row ">
              <SelectCountry
                selectedCountry={selectedNationality}
                setSelectedCountry={setSelectedNationality}
                type="Nationality"
              />
              <SelectPassenger
                setPassenger={setPassenger}
                passenger={passenger}
                type="visa"
              />
              <SelectCountry
                selectedCountry={selectedResidenceCountry}
                setSelectedCountry={setSelectedResidenceCountry}
                type="Residence Country"
              />

              {pathName !== "/searchVisa" ? (
                <Link
                  href={`/searchVisa?${queryParams}`}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: isDesktop ? "xl" : "sm",
                    }),
                    "h-10 w-full cursor-pointer rounded px-4 md:w-auto xl:h-[5.2vh] 2xl:h-[5.4vh]"
                  )}
                  onClick={(e) => {
                    if (!selectedCountry.id) {
                      e.preventDefault()
                      toast({
                        title: "Please fill Country fields",
                        duration: 1000,
                      })
                    } else {
                      addData()
                    }
                  }}
                >
                  Search
                </Link>
              ) : (
                <Button
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }),
                    "w-full rounded bg-[#06aebd] px-4  md:h-[5.4vh] md:w-auto"
                  )}
                  onClick={() => startTransition(() => changeRoute())}
                >
                  Search
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {isPending && <LoadingIndicator />}
    </>
  )
}

export default VisaSearchBox
