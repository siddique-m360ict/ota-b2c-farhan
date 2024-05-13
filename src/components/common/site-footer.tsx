import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Image from "next/image"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("bg-secondaryBg pb-6", className)}>
      <div className="">
        <div className="container  flex flex-col items-center justify-between gap-4 border-b border-t py-10 md:h-24 md:flex-row md:py-[5rem]">
          <div className="flex w-full justify-center ">
            <div className="mx-auto">
              <div className="mb-4 flex items-center justify-center">
                <Image
                  src={"/m360ict.png"}
                  alt="M360ict logo"
                  width={80}
                  height={80}
                />
              </div>

              <div className="">
                <div className="mb-4 flex items-center justify-center gap-6">
                  <p className="font-heading text-sm font-bold text-primary">
                    Booking.Expert
                  </p>
                </div>
                <p className="text-center font-sans text-xs">
                  Booking Expert is part of M360ICT Limited, one of the worlds
                  leading providers of travel services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="container text-center">
          <div className="text-xs md:text-sm">
            Copyright © 2024 Booking Expert. All rights reserved{" "}
            <br className="hidden md:block" />
            <p className="text-center text-sm leading-loose ">
              Built and maintained by{" "}
              <a
                href={"https://m360ict.com/"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                M360ICT Limited
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
