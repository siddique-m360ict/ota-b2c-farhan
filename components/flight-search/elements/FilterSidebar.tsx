"use client"
import { Filter } from "@/components/home/elements/types/flightSearchType"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { docsConfig } from "@/config/docs"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectFilterItem } from "@/lib/redux/slice/flight_filter"
import { hostedImage } from "@/lib/utils"
import Image from "next/image"
import React, { ChangeEvent, useState } from "react"
import ArrivalTime from "./ArrivalTime"
import DepartureTime from "./DepartureTime"
import FilterAirline from "./FilterAirline"
import PriceRangeFilter from "./PriceRangeFilter"
import RefundableNonRefund from "./RefundableNonRefund"
import Stoppage from "./Stoppage"

type Props = {
  filterItem: Filter | undefined
}
const FilterSidebar = () => {
  let filterItem = useAppSelector(selectFilterItem)
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block ">
      <RefundableNonRefund />
      <Separator orientation="horizontal" className="my-4 h-[1px] w-full" />
      <FilterAirline Airlines={filterItem?.airlines} />
      <Separator orientation="horizontal" className="my-5 h-[1px] w-full" />
      <PriceRangeFilter price={filterItem?.price_rage} />
      <Separator orientation="horizontal" className=" my-5 h-[1px] w-full" />

      <Stoppage filter={filterItem?.total_stoppage} />
      <Separator orientation="horizontal" className=" my-5 h-[1px] w-full" />
      <h3 className="mb-4 font-bold text-secondary">Times</h3>
      <DepartureTime />
      <ArrivalTime />
      <Separator orientation="horizontal" className=" my-5 h-[1px] w-full" />
      {/* <DocsSidebarNav items={docsConfig.sidebarNav} /> */}
    </aside>
  )
}

export default FilterSidebar
