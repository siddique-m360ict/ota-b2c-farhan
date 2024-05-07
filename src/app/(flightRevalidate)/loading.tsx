import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const loading = () => {
  return (
    <>
      <div className="min-h-screen ">
        <div className="container mx-auto py-5">
          <div className="mt-5 flex flex-col gap-5 md:flex-row">
            <div className="order-1 md:order-2 md:flex-1">
              <Skeleton className="h-48 w-full md:w-[20vw]" />
            </div>

            <div className="order-2 flex-[2.5] space-y-5 md:order-1">
              <div className="flex flex-[2.5] flex-col gap-4">
                <div>
                  <div className="my-4">
                    <Skeleton className="h-10 w-[50%]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div>
                  <div className="my-4">
                    <Skeleton className="h-10 w-[50%]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default loading
