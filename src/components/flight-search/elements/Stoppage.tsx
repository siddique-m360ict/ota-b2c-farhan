"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import React, { useEffect, useState } from "react"

type Props = {
  filter: number[] | undefined
}

const Stoppage = ({ filter: total_stoppage }: Props) => {
  const filterOption = useAppSelector(selectFilterOption)
  const dispatch = useAppDispatch()
  const [stoppage, setStoppage] = useState<
    {
      label: string
      value: string
    }[]
  >()

  useEffect(() => {
    if (total_stoppage?.length) {
      const stoppages = total_stoppage?.map((item: number) => {
        return {
          label:
            item === 0
              ? "Nonstop"
              : item === 1
              ? "1 Stop"
              : item === 2
              ? "2 Stop"
              : item === 3
              ? "3 Stop"
              : "",
          value: item?.toString(),
        }
      })
      setStoppage(stoppages)
    }
  }, [total_stoppage])

  const handleCheckboxChange = (value: string) => {
    if (!filterOption) return

    let updatedStoppage

    // Handle the case where filterOption?.stoppage is null or undefined
    const currentStoppage = filterOption?.stoppage || []

    if (currentStoppage.includes(Number(value))) {
      updatedStoppage = currentStoppage.filter((stop) => stop !== Number(value))
    } else {
      updatedStoppage = [...currentStoppage, Number(value)]
    }

    dispatch(setFilterOption({ ...filterOption, stoppage: updatedStoppage }))
  }

  return (
    <div>
      <h3 className="mb-3 font-bold text-secondary">Stops</h3>
      {stoppage?.map((stop, index) => (
        <div className="mb-3 flex items-center space-x-2" key={index}>
          <Checkbox
            id={stop.value}
            value={stop.value}
            className="border-2 border-destructive"
            onCheckedChange={(event) => handleCheckboxChange(stop.value)}
            checked={
              filterOption?.stoppage?.includes(Number(stop.value)) || false
            }
          />
          <Label
            htmlFor={stop.value}
            className="flex cursor-pointer items-center gap-2"
          >
            {stop.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default Stoppage
