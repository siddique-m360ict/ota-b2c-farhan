import { Fare } from "@/components/home/elements/types/flightSearchType"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  fare: Fare
  className?: string
}
const FareDetails = ({ fare, className }: Props) => {
  const fareDetails = [
    { label: "Base Fare", value: fare.base_fare },
    { label: "Discount", value: fare.discount },
    { label: "AIT", value: fare.ait },
    { label: "Total Price", value: fare.total_price },
    { label: "Total Tax", value: fare.total_tax },
    { label: "Payable", value: fare.payable },
  ]

  return (
    <div>
      <div className={cn("flex flex-col px-2 ", className)}>
        {fareDetails.map((item, index) => (
          <div>
            <div key={index} className="flex justify-between">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <Separator
              orientation="horizontal"
              className="my-1 h-[1px] w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FareDetails
