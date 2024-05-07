"use client"
import { Slider } from "@/components/ui/slider"
import React, { useState } from "react"

const DepartureTime = () => {
  const [range, setRange] = useState<number[]>([0, 24])
  const [prevPrice, setPrevPrice] = useState<number[]>([0, 24])

  const handleSliderChange = (value: number[]) => {
    setRange([value[0], value[1]])
  }

  const handleAfterSliderChange = (value: number[]) => {
    console.log(value)
  }

  return (
    <div className="mb-5 grid w-full gap-4 ">
      <label className=" mb-1 flex gap-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Departure Time{" "}
        <p>
          {range[0] < 10
            ? `0${range[0]?.toLocaleString()}:00`
            : range[0]?.toLocaleString() + ":00"}
          -{" "}
          {range[1] >= 10
            ? range[1]?.toLocaleString() + ":00"
            : `0${range[1]?.toLocaleString()}:00`}
        </p>
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
        trackClassName="h-[1px]  "
        rangClassName="bg-black"
        thumbClassName="border-black"
      />
    </div>
  )
}

export default React.memo(DepartureTime)
