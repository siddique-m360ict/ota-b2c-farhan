import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Image from "next/image"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("bg-secondaryBg pb-6", className)}>
      <div>
        <div className="flex flex-col items-center justify-between gap-4 border-b border-t px-4 py-10 md:container md:h-24 md:flex-row md:px-0 md:pb-[5rem] md:pt-[6rem]">
          <div className="flex w-full justify-center ">
            <div className="mx-auto w-full">
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
                    Booking Expert
                  </p>
                </div>
                <p className="text-center font-sans text-xs">
                  Booking Expert is part of M360ICT, One of the worlds leading
                  providers of travel services.
                </p>
                <div className="mt-6 flex w-full justify-between">
                  <p className="text-xs font-bold text-primary">
                    Address: House# 74 Road# 7, Block# H, Banani, Dhaka-1213
                  </p>
                  <p className="text-xs font-bold text-primary">
                    Contact Us: +8809638336699, info@m360ict.com
                  </p>
                </div>
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
                M360ICT
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
