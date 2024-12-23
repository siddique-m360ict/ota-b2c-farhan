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

type Props = {
  country: any
  countryPage: any
}
const VisaDetailsHeader = ({ country, countryPage }: Props) => {
  return (
    <div className="relative">
      <header
        className="page-header bg-primary pb-[73px] pt-[30px]"
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
                  {country.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-start gap-2 md:gap-3">
            <h1 className="title h4-semibold-22 md:h2-semibold-32 text-white lg:text-4xl lg:font-semibold lg:leading-normal">
              {countryPage.title}
            </h1>
            <p className="text-[.875rem] text-[#f3f3f7]">
              {countryPage.visitPerYear} (Tourist Per Year)
              <span className="mx-2 text-lg"> | </span>
              {countryPage.capital}
              <span className="mx-2 text-lg"> | </span>GMT{" "}
              {countryPage.timeZone}
            </p>
            <div
              className="description text-[16px] leading-[28px] text-[#eaeaf0]"
              dangerouslySetInnerHTML={{ __html: countryPage.description }}
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button
              variant="outline"
              className="flex h-[4.5vh] items-center gap-2 rounded-[10px] bg-white px-6 text-[#2f3268]  hover:bg-[#2f3268] hover:text-white"
            >
              <span className="">
                <Image
                  src="/images/visa/embassy.svg"
                  alt=""
                  width={25}
                  height={25}
                />
              </span>
              <span className="text-[16px]">Embassy Details</span>
            </Button>

            <Button
              variant="outline"
              className="flex h-[4.5vh] items-center  gap-2 rounded-[10px] border-[#d9d9d9]  bg-[#2f3268] px-6 text-[#d9d9d9]"
            >
              <span className="">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 16 16"
                  height={20}
                  width={20}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2" />
                  <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a13 13 0 0 1 1.313-.805h.632z" />
                </svg>
              </span>
              <span className="text-[16px]">Book an Appointment</span>
            </Button>
          </div>
        </div>
      </header>
      <div
        className="absolute bottom-[-20px] z-0  h-10 w-full bg-[#f8f8fc]"
        style={{ borderRadius: "24px 24px 0 0" }}
      ></div>
    </div>
  )
}

export default VisaDetailsHeader
