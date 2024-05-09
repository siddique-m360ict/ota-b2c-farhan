import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Skeleton className="h-48 w-full md:w-[20vw]" />
    </div>
  )
}

export default Loading
