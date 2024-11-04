import React from "react"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import  MainNav  from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
interface MainNavProps {
  home: boolean;
}

const Page404 = () => (
  <>
    <div className="bg-primary pb-10">
      <div className="container hidden h-[8vh] justify-between pt-5   md:flex ">
        <MainNav />
      </div>
      <div className="block md:hidden">
        <HomeMobileHeader />
      </div>
    </div>
    <div className="h-[60vh]">
      <div className="container relative pb-16 pt-5 lg:pb-20 lg:pt-5">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-2 text-center">
          <Image
            src={"/images/404.png"}
            alt="not-found"
            width={500}
            height={500}
          />
          <span className="block text-sm font-medium tracking-wider text-neutral-800 dark:text-neutral-200 sm:text-base">
            {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}{" "}
          </span>
          <div className="pt-8">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                " "
              )}
            >
              Return Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
    <SiteFooter />
  </>
)

export default Page404
