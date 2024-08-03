import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import Image from "next/image"
import FirstFooter from "./FirstFooter"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t bg-secondaryBg pb-6 pt-12", className)}>
      <div className="mx-auto md:container ">
        <FirstFooter />
      </div>

      <div className=" border-t pt-6">
        <div className="container text-center">
          <div className="text-xs md:text-sm">
            Copyright © 2024 Booking Expert. All rights reserved.{" "}
            <br className="hidden md:block" />
            <p className="text-center text-sm leading-loose ">
<<<<<<< HEAD
              Developed by{" "}
=======
                 Developed by{" "}
>>>>>>> 8c99d625a92c6547930bfc9a051bcc1551a2ea38
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
