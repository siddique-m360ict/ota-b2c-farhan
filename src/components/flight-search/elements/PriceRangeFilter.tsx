"use client"
import { PriceRage } from "@/components/home/elements/types/flightSearchType"
import { Slider } from "@/components/ui/slider"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import React, { useEffect, useMemo, useState } from "react"

type Props = {
  price: PriceRage | undefined
}
const PriceRangeFilter = ({ price }: Props) => {
  const [range, setRange] = useState<number[]>([0, 1000000])
  const [prevPrice, setPrevPrice] = useState<number[]>([])
  const dispatch = useAppDispatch()

  const priceRange = useMemo(() => {
    if (price && price.min !== undefined && price.max !== undefined) {
      return [price.min, price.max]
    }
    return null
  }, [price])

  useEffect(() => {
    if (priceRange !== null) {
      setRange([priceRange[0], priceRange[1]])
      setPrevPrice([priceRange[0], priceRange[1]])
    }
  }, [priceRange])

  const handleSliderChange = (value: number[]) => {
    setRange([value[0], value[1]])
  }

  const handleAfterSliderChange = (value: number[]) => {
    dispatch(
      setFilterOption({
        min_price: value[0],
        max_price: value[1],
      })
    )
  }
  return (
    <div className="grid w-full gap-4 ">
      <label className="mb-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Price Range
      </label>

      <Slider
        min={prevPrice[0]}
        max={prevPrice[1]}
        step={1}
        value={range}
        onValueChange={handleSliderChange}
        handleAfterSliderChange={handleAfterSliderChange}
        formatLabel={(value) => ``}
        minStepsBetweenThumbs={0}
        className="mb-1 bg-destructive"
        trackClassName="h-[1px] "
      />
      <div className="mt-0 flex justify-between text-sm">
        <span>{range[0]?.toLocaleString()}</span>
        <span> {range[1]?.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default React.memo(PriceRangeFilter)
