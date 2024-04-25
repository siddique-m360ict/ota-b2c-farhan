"use client"
import { PriceRage } from "@/components/home/elements/types/flightSearchType"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { useRouter, useSearchParams } from "next/navigation"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import React, { useEffect, useMemo, useState } from "react"

type Props = {
  priceRange: PriceRage | undefined
}
const PriceRangeFilter = ({ priceRange }: Props) => {
  const [prevPrice, setPrevPrice] = useState<number[]>([])
  const params = useSearchParams()
  const queryParams = new URLSearchParams(params?.toString())
  const router = useRouter()
  const dispatch = useAppDispatch()
  const filterOption = useAppSelector(selectFilterOption)
  const [hasQuery, setHasQuery] = useState(false)

  const priceRanges = useMemo(() => {
    if (
      priceRange &&
      priceRange.min !== undefined &&
      priceRange.max !== undefined
    ) {
      return [priceRange.min, priceRange.max]
    }
    return null
  }, [priceRange])

  useEffect(() => {
    if (priceRanges !== null) {
      setPrevPrice([priceRanges[0], priceRanges[1]])
    }
  }, [priceRanges])

  useEffect(() => {
    setHasQuery(
      queryParams.get("min_price") && queryParams.get("max_price")
        ? true
        : false
    )
  }, [params])

  const updatePageParameter = (url: string, number: number[]) => {
    if (number) {
      if (url.includes("&max_price=") || url.includes("&min_price=")) {
        url = url.replace(
          /&min_price=\d+&max_price=\d+/,
          `&min_price=${number[0]}&max_price=${number[1]}`
        )
      } else {
        url += `&min_price=${number[0] || number}&max_price=${number[1]}`
      }
    }
    return url
  }

  const handleSliderChange = (value: number[]) => {
    dispatch(setFilterOption({ min_price: value[0], max_price: value[1] }))
  }

  const handleAfterChange = (value: number[]) => {
    let baseURL = `${window.location.pathname}?${queryParams.toString()}`
    const newURL = updatePageParameter(baseURL, value)
    router.replace(newURL)
  }

  const currentPrice = hasQuery
    ? [filterOption?.min_price, filterOption?.max_price]
    : priceRanges != null && priceRanges

  return (
    <div className="grid w-full max-w-80 gap-4 rounded-[12px] border border-[#14424C]/20 bg-white p-4">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Price Range
      </label>
      <Slider
        min={prevPrice[0]}
        max={prevPrice[1]}
        step={1}
        value={[currentPrice[0], currentPrice[1]]}
        onChange={(value) => handleSliderChange(value as number[])}
        onAfterChange={(value) => handleAfterChange(value as number[])}
        range
      />
    </div>
  )
}

export default PriceRangeFilter
