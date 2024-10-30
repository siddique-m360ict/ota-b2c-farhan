"use client"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Icons } from "../icons"
import { useSelectedLayoutSegment } from "next/navigation"
import { Passenger } from "./VisaSearchBox"
import { IGetSingleVisa } from "@/app/(visaSearch)/actions"
import { formatNumber } from "@/lib/utils"
import VisaForm from "./elements/VisaForm"
import VisaDetails from "./elements/VisaDetails"

type Props = {
  data: IGetSingleVisa
  token: string
  id: string
}
const ReviewBookVisa = ({ data, token, id }: Props) => {
  const segment = useSelectedLayoutSegment()
  const [passengers, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  })

  useEffect(() => {
    if (window !== undefined) {
      const searchVisa = JSON.parse(localStorage.getItem("visaSearch"))
      if (searchVisa && Object.keys(searchVisa).length > 0) {
        setPassenger(searchVisa.passenger)
      }
    }
  }, [segment])

  const totalTravelers =
    passengers.adult + passengers.kids + passengers.children + passengers.infant

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[70%_1fr]">
      <div>
        <Card>
          <CardContent className="grid items-center py-6 lg:grid-cols-[20%_1fr]">
            <div className="mx-auto">
              <Icons.User className="text-xs text-gray-600" size={100} />
            </div>
            <div className="grid grid-cols-[78%_1fr]">
              <div>
                <div>
                  <h1 className="mb-1 text-xl font-bold">
                    {" "}
                    {data.max_validity} Day {data.type} Visa
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-sm">
                    <Icons.checkRound className="size-4" /> Visa issuance
                    rights reserved by the embassy.
                  </p>
                </div>
                <div className="mt-4 grid  grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm">
                      Processing Type : {data.processing_type}
                    </p>
                    <p className="mb-1 text-sm">
                      Processing Fee : {formatNumber(data.processing_fee)}
                    </p>
                    <p className="mb-1 text-sm">Visa Type : {data.type}</p>
                    <p className="mb-1 text-sm">
                      Visa Fee : {formatNumber(data.visa_fee)}
                    </p>
                  </div>
                  <div className="flex flex-col justify-end">
                    <p className="mb-1 text-sm">
                      Max Validity : {data.max_validity} Days
                    </p>
                    <p className="mb-1 text-sm">Visa Mode : {data.visa_mode}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-4">
                  <h1 className="text-destructive">Total Price</h1>
                  <p className="text-sm">
                    BDT{" "}
                    {data
                      ? formatNumber(
                          (parseInt(data?.visa_fee) +
                            parseInt(data?.processing_fee)) *
                            totalTravelers
                        )
                      : 0}
                  </p>
                  <p className="text-xs text-destructive">
                    {" "}
                    ({data && totalTravelers}{" "}
                    {totalTravelers > 1 ? "Travelers" : "Traveler"})
                  </p>
                </div>
                <div>
                  <h1 className="text-destructive">Price per person</h1>
                  <p className="text-xs">
                    BDT{" "}
                    {data
                      ? formatNumber(
                          parseInt(data?.visa_fee) +
                            parseInt(data?.processing_fee)
                        )
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <VisaDetails />
        <VisaForm passengers={passengers} token={token} visa_id={id} />
      </div>
      <div>
        <Card className="border-none shadow-2xl">
          <CardHeader className="px-6  py-4">
            <h1 className="text-[1.2rem] font-bold ">{data.country_name}</h1>
            <p>
              {totalTravelers} {totalTravelers > 1 ? "Travelers" : "Traveler"}
            </p>
          </CardHeader>
          <CardContent>
            <p className="pb-8 text-sm text-destructive">
              {data?.max_validity || 0} Day {data?.type} Visa (
              {data && totalTravelers}{" "}
              {totalTravelers > 1 ? "Travelers" : "Traveler"})
            </p>

            <div>
              <h2 className="mb-3 mt-2 text-sm font-bold text-secondary">
                Price Summary
              </h2>
              <div className="mb-[7px] flex justify-between text-sm">
                <p>Visa Fee</p>
                <p className="flex flex-col text-end">
                  BDT{" "}
                  {data
                    ? formatNumber(parseInt(data?.visa_fee) * totalTravelers)
                    : 0}
                  <span className="text-xs text-destructive">
                    ({totalTravelers} x {data?.visa_fee})
                  </span>
                </p>
              </div>
              <div className=" mb-[7px]  flex justify-between text-sm">
                <p>Processing Fee</p>
                <p className="flex flex-col text-end">
                  BDT{" "}
                  {data
                    ? formatNumber(
                        parseInt(data?.processing_fee) * totalTravelers
                      )
                    : 0}
                  <span className="text-xs text-destructive">
                    ({totalTravelers} x {data?.processing_fee})
                  </span>
                </p>
              </div>

              <div className="mb-[7px] mt-4 flex justify-between text-sm">
                <p>Sub-total</p>
                <p className="flex flex-col text-end">
                  BDT{" "}
                  {data
                    ? formatNumber(
                        (parseInt(data?.visa_fee) +
                          parseInt(data?.processing_fee)) *
                          totalTravelers
                      )
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
          <div className="mx-4 mt-2 h-px w-[90%] border border-dashed bg-secondaryBg"></div>
          <CardFooter className="my-6 flex flex-row justify-between text-xl font-bold ">
            <p>Total Amount</p>
            <p className="flex flex-col text-end text-primary">
              BDT{" "}
              {data
                ? formatNumber(
                    (parseInt(data?.visa_fee) +
                      parseInt(data?.processing_fee)) *
                      totalTravelers
                  )
                : 0}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ReviewBookVisa
