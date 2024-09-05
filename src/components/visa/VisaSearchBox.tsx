"use client"
import { cn } from "@/lib/utils"
import React, { useEffect, useState, useTransition } from "react"
import { Card, CardContent } from "../ui/card"
import SelectCountry from "./elements/SelectCountry"
import LoadingIndicator from "../common/spinner/LoadingIndicator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectCitizenCountry,
  selectTravelingCountry,
  selectVisaCategory,
  setCitizenCountry,
  setTravelingCountry,
  setVisaCategory,
} from "@/lib/redux/slice/visaSlice/visaSearchState"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import categoryData from "../../../public/data/visa/visaCategory.json"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

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
  const [isPending, startTransition] = useTransition()
  // get search state form redux slice
  const citizenCountry = useAppSelector(selectCitizenCountry)
  const travelingCountry = useAppSelector(selectTravelingCountry)
  const visaCategory = useAppSelector(selectVisaCategory)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const dispatch = useAppDispatch()
  return (
    <>
      <Card className={cn(!home && "shadow-xl", className)}>
        <CardContent
          className={cn("px-4 text-start md:px-6 md:pt-11", !home && "md:pt-4")}
        >
          <div className="mb-[7px] mt-1 flex items-center justify-between md:justify-start md:gap-5">
            <p className=" p-0 font-heading text-destructive">Search Visa</p>
          </div>
          <div className="grid grid-cols-1 items-center gap-3 md:gap-2 xl:grid-cols-9 2xl:grid-cols-10">
            <div className="grid grid-cols-3 gap-2 xl:col-span-8 2xl:col-span-9 ">
              {/* citizen country  */}
              <SelectCountry
                country={citizenCountry}
                label="I’m a Citizen of"
                setSelectedCountry={(selectedCountry) => {
                  dispatch(setCitizenCountry(selectedCountry))
                }}
              />

              {/* traveling country*/}
              <SelectCountry
                country={travelingCountry}
                label="Traveling to"
                setSelectedCountry={(selectedCountry) => {
                  dispatch(setTravelingCountry(selectedCountry))
                }}
              />

              <div>
                <label className="flex flex-col pr-0">
                  <span className="mb-[6px] text-sm font-[400] text-[#4A4A4A]  ">
                    Visa Category
                  </span>

                  <Card className="cursor-pointer rounded px-3 py-2 text-start">
                    <CardContent className="h-[4vh] w-full cursor-pointer p-0">
                      <Select
                        value={visaCategory}
                        onValueChange={(value) => {
                          dispatch(setVisaCategory(value))
                        }}
                      >
                        <SelectTrigger
                          className={`w-full border-none p-0 text-[22px] font-[900] leading-[30px] focus:ring-0 [&_svg]:hidden`}
                        >
                          <SelectValue placeholder="Visa Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categoryData.map((category) => (
                              <SelectItem
                                value={category.title}
                                key={category.title}
                              >
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                </label>
              </div>
            </div>

            <div>
              <Link
                href={`/visaDetails/${travelingCountry.title.toLowerCase()}`}
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: isDesktop ? "xl" : "sm",
                  }),
                  "h-10 rounded px-4 md:mt-[25px] xl:h-[5.6vh] 2xl:h-[5.5vh]"
                )}
                onClick={(e) => {}}
              >
                Check Details
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      {isPending && <LoadingIndicator />}
    </>
  )
}

export default VisaSearchBox
