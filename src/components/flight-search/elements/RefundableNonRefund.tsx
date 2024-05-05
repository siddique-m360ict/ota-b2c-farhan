import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import React, { ChangeEvent } from "react"

type refutability = {
  name: string
  status: string
}

const refundData: refutability[] = [
  {
    name: "Refundable",
    status: "true",
  },
  {
    name: "Non Refundable",
    status: "false",
  },
]

const RefundableNonRefund = () => {
  const filterOption = useAppSelector(selectFilterOption)
  const dispatch = useAppDispatch()

  const handleCheckboxChange = (value: string) => {
    let refundable: string

    if (filterOption?.refundable === value) {
      refundable = ""
    } else {
      refundable = value
    }
    dispatch(setFilterOption({ refundable: refundable }))
  }

  return (
    <div>
      <h3 className="mb-3 font-bold text-secondary">Refundability</h3>
      {refundData?.map((refund, index) => (
        <div className="mb-3 flex items-center space-x-2" key={index}>
          <Checkbox
            id={refund.status}
            value={refund.status}
            className="border-2 border-destructive"
            onCheckedChange={(event) => handleCheckboxChange(refund.status)}
            checked={refund.status === filterOption?.refundable}
          />
          <Label
            htmlFor={refund.status}
            className="flex cursor-pointer items-center gap-2"
          >
            {refund.name}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default RefundableNonRefund
