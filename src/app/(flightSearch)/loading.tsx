import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const loading = () => {
  return (
    <div className="container">
      <div className="my-4">
        <Skeleton className="h-[130px] w-full rounded-xl" />
      </div>
      <div className="my-4">
        <Skeleton className="h-[50px] w-full rounded-xl" />
      </div>
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block ">
          <Skeleton className="h-screen w-full rounded-xl" />
        </aside>
        <div>
          <div>
            <Skeleton className="mb-3 h-[50px] w-full rounded-xl bg-secondaryBg" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 9 }, (_, index) => (
              <Skeleton key={index} className="h-[90px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading
