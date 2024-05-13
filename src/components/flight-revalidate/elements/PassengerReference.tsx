import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React, { Dispatch, SetStateAction } from "react"
import { referenceType } from "./FormField"

type Props = {
  type: "Adult" | "Child" | "Infant" | "All"
  setReference: any
  reference: referenceType
}

const PassengerReference = ({ reference, setReference, type }: Props) => {
  let arr: any[] = []

  if (type === "Adult") {
    arr = ["MR", "MS", "MRS"]
  } else if (type === "Child") {
    reference !== "MISS" && setReference("MASTER")
    arr = ["MISS", "MASTER"]
  } else if (type === "Infant") {
    reference !== "MISS" && setReference("MASTER")
    arr = ["MISS", "MASTER"]
  } else if (type === "All") {
    arr = ["MISS", "MASTER", "MS", "MR", "MRS"]
  }

  return (
    <div>
      <div className="mt-2 grid gap-1">
        <Label className="sr-only" htmlFor="username">
          Gender
        </Label>
        <RadioGroup
          value={reference}
          onValueChange={(value: referenceType) => setReference(value)}
          className="mt-4 flex items-center gap-4"
        >
          {arr?.map((item, index) => (
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={item}
                id={item}
                key={index}
                className="border-destructive"
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default PassengerReference
