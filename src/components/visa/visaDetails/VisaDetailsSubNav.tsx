"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

type Props = {
  countrySections: any
  countryFaqs: any
}
const VisaDetailsSubNav = ({ countrySections, countryFaqs }: Props) => {
  const active = true
  return (
    <section className="main-content-header sticky top-0 z-[9999] bg-[#f8f8fc] py-2">
      <div className="flex justify-center ">
        <div className="relative overflow-x-auto" id="menu-items-list">
          <ul className="flex items-center gap-[15px] text-[#989ab3]">
            <li
              className={cn(
                "whitespace-nowrap",
                active &&
                  "visa-sub-tab-active relative border-b-2 border-b-[#2f3268] text-[#2f3268]"
              )}
            >
              <p>
                <Link href="#country-type-of-visa">Type of visa</Link>
              </p>
            </li>
            <span>|</span>
            <li className="whitespace-nowrap">
              <p>
                <Link href="#country-available-services">
                  Available Services
                </Link>
              </p>
            </li>
            <span>|</span>
            <li className="whitespace-nowrap ">
              <p>
                <Link href="#country-applying-process">Applying Process</Link>
              </p>
            </li>
            <span>|</span>
            {countrySections.map((section, index) => (
              <>
                <li className="whitespace-nowrap">
                  <p>
                    <Link
                      href={`#country-${section.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                    >
                      {section.name}
                    </Link>
                  </p>
                </li>
                {(index < countrySections.length - 1 ||
                  countryFaqs.length > 0) && <span>|</span>}
              </>
            ))}

            {countryFaqs && countryFaqs.length > 0 && (
              <li className="whitespace-nowrap ">
                <p>
                  <Link
                    href={`#country-faq`}
                    id="tab-menu-country-time-and-fees"
                  >
                    FAQ
                  </Link>
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default VisaDetailsSubNav
