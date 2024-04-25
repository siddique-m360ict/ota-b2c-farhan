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
import FilterAirline from "./FilterAirline"
import PriceRangeFilter from "./PriceRangeFilter"

type Props = {
  filterItem: Filter | undefined
}
const FilterSidebar = () => {
  let filterItem = useAppSelector(selectFilterItem)
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block ">
      <FilterAirline Airlines={filterItem?.airlines} />
      <Separator orientation="horizontal" className=" mb-4 h-[1px] w-full" />
      <PriceRangeFilter priceRange={filterItem?.price_rage} />
      <Separator orientation="horizontal" className=" mb-4 h-[1px] w-full" />
      <DocsSidebarNav items={docsConfig.sidebarNav} />
    </aside>
  )
}

export default FilterSidebar
