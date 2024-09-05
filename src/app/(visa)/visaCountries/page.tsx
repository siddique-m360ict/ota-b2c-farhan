"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import Image from "next/image"
import React, { useState } from "react"
import visaCountries from "../../../../public/data/visa/visaCountry.json"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import Link from "next/link"

const VisaCountryPage = () => {
  const continents = [
    "View All",
    ...Array.from(new Set(visaCountries.map((item) => item.continent))).sort(),
  ]

  const [selectedContinent, setSelectedContinent] = useState("View All")
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedQuery = useDebounce(searchTerm, 400)

  const filterCountries = (continent) => {
    let filteredCountries = visaCountries
    if (continent !== "View All") {
      filteredCountries = filteredCountries.filter(
        (item) => item.continent === continent
      )
    }
    if (searchTerm) {
      filteredCountries = filteredCountries.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filteredCountries.sort((a, b) => a.title.localeCompare(b.title))
  }

  const getVisibleContinents = () => {
    const visibleContinents = new Set()
    if (selectedContinent === "View All") {
      continents.forEach((continent) => {
        if (continent !== "View All") {
          const countries = filterCountries(continent)
          if (countries.length > 0) {
            visibleContinents.add(continent)
          }
        }
      })
    } else {
      const countries = filterCountries(selectedContinent)
      if (countries.length > 0) {
        visibleContinents.add(selectedContinent)
      }
    }
    return Array.from(visibleContinents)
  }

  return (
    <div>
      <div className="relative">
        <header
          className="page-header bg-primary pb-[53px] pt-[30px]"
          style={{
            backgroundImage:
              "url(/images/visa/banner_bg_pattern.svg), linear-gradient(93deg, #194185, #2662c9)",
            inset: 0,
          }}
        >
          <div className="container">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center gap-2 text-[#bfbfd0]"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 16 16"
                      height={22}
                      width={22}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z"
                      />
                    </svg>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="capitalize text-[#bfbfd0]"
                  >
                    Bangladesh
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-white">
                    Countries
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col items-start gap-2 md:gap-3">
              <div className="grid grid-cols-6 items-center gap-8">
                <div className="col-span-4 flex flex-col gap-3">
                  <h1 className="title h4-semibold-22 md:h2-semibold-32 text-white lg:text-[2.25rem] lg:font-semibold lg:leading-normal">
                    Visa Information for Bangladesh
                  </h1>
                  <p className="text-[16px] leading-[28px]  text-[#eaeaf0]">
                    Discover everything you need to know about visa
                    requirements, application processes, and travel tips for
                    visiting Bangladesh. Explore Booking Expert&apos;s detailed
                    guide to ensure a smooth and hassle-free travel experience
                    to this vibrant country.
                  </p>
                </div>

                <div className="col-span-2">
                  <Image
                    src={"/images/visa/countries.svg"}
                    alt=""
                    width={500}
                    height={500}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className="absolute bottom-[-20px] z-0  h-10 w-full bg-[#f8f8fc]"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </div>

      <div className="py-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-md border bg-white px-4 py-3">
            <Image
              src={"/images/visa/search.svg"}
              alt=""
              width={20}
              height={20}
            />
            <input
              placeholder="Search"
              id="searchTerm"
              className=" outline-none"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* tabs  */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {continents.map((continent, index) => (
              <div
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-2 hover:bg-[#2f3268] hover:text-white",
                  selectedContinent === continent && "bg-[#2f3268] text-white"
                )}
                key={index}
                onClick={() => setSelectedContinent(continent)}
              >
                <div>
                  <p className="whitespace-nowrap leading-5">{continent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* main content  */}
        <div className="container">
          <div>
            {getVisibleContinents().map((continent: string, index) => (
              <div key={index} className="continent-section mt-8">
                <div className="mb-[40px] text-center">
                  <p className="mb-2 text-[16px] leading-[28px] text-[#989ab3]">
                    {continent}
                  </p>
                  <h2 className="mb-1 text-[32px] font-[600]">
                    Countries in
                    <span className="text-primary"> {continent}</span>
                  </h2>
                </div>

                <div className="grid grid-cols-3  gap-[34px]">
                  {filterCountries(continent).map((item) => (
                    <Link
                      href={`/visaDetails/${item.title.toLowerCase()}`}
                      className="hover:font-bold hover:text-primary"
                    >
                      <div
                        key={item.id}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <Image
                          src={item.flag}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="h-10 w-14 rounded-[.5rem]"
                        />
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisaCountryPage
