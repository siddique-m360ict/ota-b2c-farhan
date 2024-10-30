"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  country: any
}
const VisaSidebar = ({ country }: Props) => {
  return (
    <section className="col-span-2">
      <div className="sticky top-0">
        {/* Calculate  card */}
        <div className="">
          <div className="calculate_card">
            <div
              className="p-[12px] text-center"
              style={{
                background:
                  "#2e90fa url(/images/visa/calculate_pattern.svg) no-repeat center center / cover",
                borderRadius: "10px 10px 0 0",
              }}
            >
              <p className="text-[.875rem] font-[500] leading-normal  text-[#eaeaf0]">
                Calculate Your
              </p>
              <p className="text-[1.125rem] font-[600] leading-7 text-white">
                Visa Fee &amp; Service Cost
              </p>
            </div>
            <div
              className="main_content_wrapper border-x border-b-4 border-x-[#9394b2] border-b-[#9394b2] bg-white px-[16px] py-[8px] "
              style={{
                borderRadius: "0 0 10px 10px",
              }}
            >
              <div className="mb-2 flex items-center gap-4">
                <div className="image_container">
                  <Image
                    alt="calculate thumb"
                    loading="lazy"
                    width={180}
                    height={90}
                    src="/images/visa/calculate_thumb.svg"
                    style={{ color: "transparent" }}
                  />
                </div>
                <p className="text-[14px] leading-normal text-[#666885]">
                  Choose your visa type and entry to find the total cost of your{" "}
                  {country.title} visa from {country.organization}
                </p>
              </div>
              <div className="text-center">
                <Link
                  className="custom_link inline-block"
                  href={`/applyVisa/${country.title.toLowerCase()}`}
                >
                  <Button
                    type="button"
                    className="h-[5vh] rounded-[10px] bg-[#2f3268] px-11 text-[16px]"
                    size="lg"
                  >
                    <span>Apply Now</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* documents card  */}
        <div
          className="my-5 rounded-lg bg-white p-4"
          style={{
            boxShadow: "0 29px 36px 0 rgba(196, 196, 218, .41)",
          }}
        >
          <div className="flex items-center gap-3">
            <Image
              src={"/images/visa/require_thumb.svg"}
              alt=""
              width={90}
              height={90}
            />
            <p className="text-[14px] leading-normal text-[#666885]">
              Check the Documents Needed for {country.title} Visa from
              {country.organization}
            </p>
          </div>
          <div className="mt-2 text-center">
            <Link
              className="custom_link inline-block"
              href="/bangladesh/pakistan/apply-online/"
            >
              <Button
                type="button"
                className="h-[5vh] rounded-[10px] bg-[#2f3268] px-20 text-[16px]"
                size="lg"
              >
                <span>Document Checklist</span>
              </Button>
            </Link>
          </div>
        </div>
        {/* call  */}
        <div className="my-5 rounded-lg border border-[#dde3fd] bg-white p-6">
          <div className="flex items-center justify-center gap-3">
            <Image
              src={"/images/visa/call.svg"}
              alt=""
              width={25}
              height={25}
            />
            <p className="text-[18px] font-[500] leading-7 text-[#0f0f24]">
              Need Help Feel FREE To Call
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Image src={"/images/visa/tel.svg"} alt="" width={22} height={22} />
            <p className="text-[18px] text-[#0f0f24]">+8809638336699</p>
          </div>
        </div>

        <div className="rounded-lg border border-[#dde3fd] bg-white p-6">
          <div className="flex items-center justify-center gap-3">
            <p className="text-[18px] font-[500] leading-7 text-[#0f0f24]">
              Chat With
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-4">
              <Link href={"https://wa.me/+8809638336699"} target="_blank">
                <div className="rounded-lg border p-2">
                  <Image
                    src={"/images/visa/whatsapp.png"}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
              </Link>

              <div className="rounded-lg border p-2">
                <Image
                  src={"/images/visa/messenger.png"}
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisaSidebar
