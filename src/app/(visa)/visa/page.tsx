"use client"
import React, { useState } from "react"
import visaList from "../../../../public/data/visa/landingPageVisa.json"
import Image from "next/image"
import "@/components/visa/style/visaStyle.css"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import "@/styles/embla.css"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

const VisaPage = () => {
  const visaMethods = [
    "ALL",
    ...Array.from(new Set(visaList.map((item) => item.visaMethod))),
  ]
  const [selectedMethod, setSelectedMethod] = useState("ALL")
  const [selectedLetter, setSelectedLetter] = useState("ALL")

  // Filter data based on the selected visa method and selected letter
  const filteredData = visaList.filter(
    (item) =>
      (selectedMethod === "ALL" || item.visaMethod === selectedMethod) &&
      (selectedLetter === "ALL" ||
        item.title[0].toUpperCase() === selectedLetter)
  )

  const tabs = [
    {
      name: "ALL",
      img: "/images/visa/All.svg",
      count: 186,
    },
    {
      name: "E-Visa",
      img: "/images/visa/E-Visa.svg",
      count: 45,
    },
    {
      name: "Flexible Submission",
      img: "/images/visa/Flexible-Submission.svg",
      count: 41,
    },
    {
      name: "In-Person Submission",
      img: "/images/visa/In-Person-Submission.svg",
      count: 71,
    },
    {
      name: "Visa Free",
      img: "/images/visa/Visa-Free.svg",
      count: 14,
    },
    {
      name: "Visa On Arrival",
      img: "/images/visa/Visa-On-Arrival.svg",
      count: 16,
    },
  ]
  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        <div className="title mb-10 ">
          <p className="text-[16px] leading-[24px] text-[#989ab3]">
            Discover the World
          </p>
          <h1 className="text-[20px] font-bold">
            Find the gateway of{" "}
            <span className="text-primary">{visaList.length}+ countries </span>
            with an effortless visa solution
          </h1>
        </div>
        <Link href={"/visaCountries"}>
          <Button size="lg" className="rounded">
            View All
          </Button>
        </Link>
      </div>

      <div className="">
        {/* tabs  */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab, index) => (
            <div
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-2 hover:bg-[#2f3268] hover:text-white",
                selectedMethod === tab.name && "bg-[#2f3268] text-white"
              )}
              key={index}
              onClick={() => setSelectedMethod(tab.name)}
            >
              <Image src={tab.img} alt="all image" width={30} height={30} />
              <div>
                <p className="whitespace-nowrap leading-5">{tab.name}</p>
                <p className="whitespace-nowrap text-sm">
                  {" "}
                  ({tab.count} Countries)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Letter Filter */}
      <div className="mt-6 flex max-w-full items-center justify-center 2xl:gap-6 ">
        <p className="text-xs">Search by Country</p>

        <div className="flex items-center gap-2 overflow-x-auto">
          {["ALL", ...Array.from(new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ"))].map(
            (letter, index) => (
              <button
                key={index}
                onClick={() => setSelectedLetter(letter)}
                className={cn(
                  "rounded-md border border-[#b7eb8f] bg-[#f6ffed] px-3 py-1 text-[#389e0d]",
                  selectedLetter === letter && "bg-[#2f3268] text-white"
                )}
              >
                {letter}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
        {filteredData?.map((item, index) => (
          <Link href={`/visaDetails/${item.title.toLowerCase()}`}>
            <div
              className="rounded-[10px] border border-[#eaeaf0] bg-[#fcfcfd] px-3 py-2"
              key={index}
            >
              <div className="flex items-center gap-2 border-b border-b-[#eaebf0] pb-3 pt-1">
                <Image
                  src={item.flag}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-[2px]"
                />
                <p>{item.title}</p>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-start gap-[6px]">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    className="text-[#666885] transition-colors duration-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z" />
                    <path fill="none" d="M0 0h24v24H0V0z" />
                  </svg>
                  <p className="flex items-center gap-2 text-[.75rem] text-[#989ab3]">
                    Available Services{" "}
                    {item.services.length > 2 && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-pointer rounded border border-[#b7eb8f] bg-[#f6ffed] p-[2px] px-2 text-[12px] text-[#389e0d]">{`+${
                              item.services.length - 2
                            }`}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.services.slice(2).map((service, index) => (
                              <p key={service.id} className="m-0">
                                {index + 1}. {service.serviceTitle}
                              </p>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <ul className="timeline ml-[3px] mt-[13px]">
                    {item.services.slice(0, 2).map((service) => (
                      <li
                        className="timeline-item relative pb-[4px]"
                        key={service.id}
                      >
                        <div className="timeline-item-tail" />
                        <div className="timeline-item-head">
                          <div className="dot" />
                        </div>
                        <div className="timeline-item-content">
                          <p className="line-clamp-1">{service.serviceTitle}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default VisaPage
