import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const DetailsDataUnderProcessing = () => {
  return (
    <div>
      <div
        className="h-[60vh]"
        style={{
          backgroundImage: "url(/images/visa/page_not_found.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative pb-16 pt-5 lg:pb-20 lg:pt-5">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-2 text-center">
            <Image
              src={"/images/visa/404.svg"}
              alt="not-found"
              width={500}
              height={500}
            />
            <span className="block text-sm font-medium tracking-wider text-neutral-800 dark:text-neutral-200 sm:text-base">
              Oops, we’re a little lost. We can’t find this visa Data, Admin has
              not added these details yet!
            </span>
            <div className="pt-8">
              <Link
                href="/visaCountries"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  " "
                )}
              >
                Return Visa Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsDataUnderProcessing
