"use client"
import React, { useEffect, useRef, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { IGetVisaList, IReqVisaSearch } from "@/app/(visaSearch)/actions"
import { format } from "date-fns"
import { cn, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { toast } from "../ui/use-toast"

type Props = {
  visa: IGetVisaList[]
  searchParams: IReqVisaSearch
}

const VisaListView = ({ visa, searchParams }: Props) => {
  const [filter, setFilter] = useState("ALL")
  const uniqueVisaTypes = [
    "ALL",
    ...Array.from(new Set(visa.map((v) => v.type))),
  ]

  const filterVisas = (type: string) => {
    if (type === "ALL") return visa
    return visa.filter((v) => v.type === type)
  }
  const { adults, child, infant, kids } = searchParams
  const totalTravelers =
    (parseInt(adults) || 0) +
    (parseInt(child) || 0) +
    (parseInt(infant) || 0) +
    (parseInt(kids) || 0)
  const visaPriceCardRef = useRef<HTMLDivElement>(null)
  const [selectedVisa, setSelectedVisa] = useState<IGetVisaList>()

  useEffect(() => {
    if (selectedVisa && visaPriceCardRef.current) {
      visaPriceCardRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedVisa])

  return (
    <div className="container mx-auto p-4">
      <div className="flex-1 md:mt-3  md:grid md:gap-6 lg:grid-cols-[70%_1fr] lg:gap-6">
        <div>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="mb-4 flex space-x-2">
              {uniqueVisaTypes.map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className={cn(
                    "rounded border border-[#06aebd] bg-transparent px-4 py-2",
                    filter === type && "bg-[#06aebd] text-white"
                  )}
                >
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>

            {uniqueVisaTypes.map((type) => (
              <TabsContent key={type} value={type}>
                <div className="mb-4 flex flex-col gap-2  text-black">
                  {filterVisas(type).map((visa) => (
                    <div className="relative bg-card  p-4 dark:text-white">
                      <div className="flex justify-between">
                        <p className="text-lg">
                          {visa.max_validity} Day {visa.type} Visa
                        </p>
                      </div>
                      <div>
                        <div className="items-center justify-between md:flex">
                          <div className="basis-9/12 justify-between md:flex">
                            <div className="flex gap-2">
                              <p className="font-bold text-[#1C79BE]">
                                Processing Type:
                              </p>
                              <p>{visa.processing_type}</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-bold text-[#2D9596]">
                                Processing Fee:
                              </p>
                              <p>{visa.processing_fee}</p>
                            </div>
                            <div className="flex gap-2">
                              <p className="font-bold text-[#2D9596]">
                                Visa Fee:
                              </p>
                              <p>{visa.visa_fee}</p>
                            </div>
                          </div>
                          <div className="basis-2/12 text-end">
                            <p>
                              BDT{" "}
                              {parseInt(visa.visa_fee) +
                                parseInt(visa.processing_fee)}
                            </p>
                            <Button
                              className={cn(
                                buttonVariants({
                                  variant: "default",
                                  size: "sm",
                                }),
                                "mt-1 h-6 w-full rounded bg-[#06aebd] text-white md:h-7"
                              )}
                              onClick={() => setSelectedVisa(visa)}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Separator
                        orientation="vertical"
                        className="absolute right-[20%] top-0  hidden h-full w-px md:block"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-14" id="visa-price-card" ref={visaPriceCardRef}>
          <Card className="border-none shadow-2xl">
            <CardHeader className="px-6  py-4">
              <h1 className="text-[1.2rem] font-bold ">
                {visa && visa[0]?.country_name}
              </h1>
              <p>
                {totalTravelers} {totalTravelers > 1 ? "Travelers" : "Traveler"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="pb-8 text-sm text-destructive">
                {selectedVisa?.max_validity || 0} Day {selectedVisa?.type} Visa
                ({selectedVisa && totalTravelers}{" "}
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
                    {selectedVisa
                      ? formatNumber(
                          parseInt(selectedVisa?.visa_fee) * totalTravelers
                        )
                      : 0}
                    <span className="text-xs text-destructive">
                      ({totalTravelers} x {selectedVisa?.visa_fee})
                    </span>
                  </p>
                </div>
                <div className=" mb-[7px]  flex justify-between text-sm">
                  <p>Processing Fee</p>
                  <p className="flex flex-col text-end">
                    BDT{" "}
                    {selectedVisa
                      ? formatNumber(
                          parseInt(selectedVisa?.processing_fee) *
                            totalTravelers
                        )
                      : 0}
                    <span className="text-xs text-destructive">
                      ({totalTravelers} x {selectedVisa?.processing_fee})
                    </span>
                  </p>
                </div>

                <div className="mb-[7px] mt-4 flex justify-between text-sm">
                  <p>Sub-total</p>
                  <p className="flex flex-col text-end">
                    BDT{" "}
                    {selectedVisa
                      ? formatNumber(
                          (parseInt(selectedVisa?.visa_fee) +
                            parseInt(selectedVisa?.processing_fee)) *
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
                {selectedVisa
                  ? formatNumber(
                      (parseInt(selectedVisa?.visa_fee) +
                        parseInt(selectedVisa?.processing_fee)) *
                        totalTravelers
                    )
                  : 0}
              </p>
            </CardFooter>
          </Card>
          <Link
            href={selectedVisa ? `/bookVisa?visa_id=${selectedVisa.id}` : "#"}
            className={cn(
              buttonVariants({
                variant: "default",
                size: "sm",
              }),

              "mt-1 h-6 w-full rounded bg-[#06aebd] text-white shadow-xl md:h-8"
            )}
            onClick={(e) => {
              if (!selectedVisa) {
                e.preventDefault()
                toast({
                  title: "Please select a visa",
                  duration: 1000,
                })
              }
            }}
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VisaListView
