import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from "react"
import { referenceType } from "./FormField"

type Props = {
  index?: number
  type: "Adult" | "Child" | "Infant" | "Kids" | "All"
  setReference: any
  reference: referenceType
}

const PassengerReference = ({
  index,
  reference,
  setReference,
  type,
}: Props) => {
  let arr: any[] = []

  if (type === "Adult") {
    arr = ["MR", "MS", "MRS"]
  } else if (type === "Child") {
    reference !== "MISS" && setReference("MASTER")
    arr = ["MISS", "MASTER"]
  } else if (type === "Infant" || type === "Kids") {
    reference !== "MISS" && setReference("MASTER")
    arr = ["MISS", "MASTER"]
  } else if (type === "All") {
    arr = ["MISS", "MASTER", "MS", "MR", "MRS"]
  }

  return (
    <div>
      <div className="mt-2 grid gap-1">
        <RadioGroup
          value={reference}
          onValueChange={(value: referenceType) => setReference(value)}
          className="mt-4 flex items-center gap-4"
        >
          {arr?.map((item, idx) => (
            <div className="flex items-center space-x-2" key={idx}>
              <RadioGroupItem
                value={item}
                id={`radio-${type}-${index}-${idx}`} // Unique id using type, index, and idx
                className="border-destructive"
              />
              <Label
                className="cursor-pointer"
                htmlFor={`radio-${type}-${index}-${idx}`}
              >
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default PassengerReference
