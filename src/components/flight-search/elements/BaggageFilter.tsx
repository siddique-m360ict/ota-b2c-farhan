import React, { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"

type Props = {
  baggageOptions: string[]
}
const BaggageFilter = ({ baggageOptions }) => {
  const filterOption = useAppSelector(selectFilterOption)
  const dispatch = useAppDispatch()
  const [baggage, setBaggage] = useState([])

  useEffect(() => {
    if (baggageOptions?.length) {
      const formattedBaggageOptions = baggageOptions.map((option, index) => ({
        label: option,
        value: option,
      }))
      setBaggage(formattedBaggageOptions)
    }
  }, [baggageOptions])

  const handleCheckboxChange = (value: string) => {
    if (!filterOption) return

    let updatedBaggage = [...(filterOption.baggage || [])]

    if (updatedBaggage.includes(value)) {
      updatedBaggage = updatedBaggage.filter((item) => item !== value)
    } else {
      updatedBaggage.push(value)
    }
    updatedBaggage = updatedBaggage.length === 0 ? null : updatedBaggage

    dispatch(setFilterOption({ ...filterOption, baggage: updatedBaggage }))
  }

  return (
    <div>
      <h3 className="mb-3 font-bold text-secondary">Baggage</h3>
      {baggage.map((option, index) => (
        <div className="mb-3 flex items-center space-x-2" key={index}>
          <Checkbox
            id={option.value}
            value={option.value}
            className="border-2 border-destructive"
            onCheckedChange={() => handleCheckboxChange(option.value)}
            checked={filterOption.baggage?.includes(option.value) || false}
          />
          <Label
            htmlFor={option.value}
            className="flex cursor-pointer items-center gap-2"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default BaggageFilter
