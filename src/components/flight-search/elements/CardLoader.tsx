import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const CardLoader = ({ numberFlight }: { numberFlight: number }) => {
  return (
    <div className="flex flex-col  space-y-2">
      {Array.from({ length: numberFlight }, (_, index) => (
        <Skeleton key={index} className="h-[90px] w-full rounded-xl" />
      ))}
      <LoadingIndicator />
    </div>
  )
}

export default CardLoader
