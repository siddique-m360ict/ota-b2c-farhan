"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import VisaSearchBox from "../VisaSearchBox"
import VisaPriceBox from "./VisaPriceBox"

type Props = {
  country: any
  countryPage: any
}
const ApplyDetailsHeader = ({ country, countryPage }: Props) => {
  return (
    <div className="relative">
      <header
        className="page-header bg-primary pb-[150px] pt-[30px]"
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
                <BreadcrumbLink href="#" className="capitalize text-[#bfbfd0]">
                  {country.organization}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-white">
                  Apply
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-start gap-2 md:gap-3">
            <h1 className="title h4-semibold-22 md:h2-semibold-32 text-white lg:text-4xl lg:font-semibold lg:leading-normal">
              Apply online for {country.title} Business Visit visa from
              <span className="capitalize">{country.organization}</span>
            </h1>
            <div
              className="description text-[16px] leading-[28px] text-[#eaeaf0]"
              dangerouslySetInnerHTML={{ __html: countryPage.description }}
            />
          </div>
        </div>
      </header>
      {/* visa box and sidebar price */}
      <VisaPriceBox />
    </div>
  )
}

export default ApplyDetailsHeader
