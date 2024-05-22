import Image from "next/image"
import React from "react"
import { Separator } from "../ui/separator"
import Link from "next/link"

const AppPromo = () => {
  return (
    <div className="pb-16 pt-10">
      <div
        style={{
          width: "100%",
          backgroundImage:
            "url(https://pages.trip.com/images/online-adu/bg_3.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50%",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,

          lineHeight: "normal",
        }}
        className="relative  "
      >
        <div
          style={{
            height: "366px",
            width: "183px",
            borderRadius: "0 183px 183px 0",
            backgroundColor: "rgba(35, 70, 255, .48)",
            marginLeft: "-73px",
          }}
          className="hidden md:block"
        ></div>
        <div className="h-full px-4 py-20 md:container md:px-0">
          <div className="grid md:grid-cols-2">
            <div>
              <h1 className="font-heading text-[27px] text-secondaryBg md:text-[40px]">
                Your all-in-one travel app
              </h1>
              <div>
                <div className="mt-3 inline-block rounded-full bg-[#2346FF] px-4 py-2 md:mt-4 md:py-[12px]">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/home/check.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                      <span className="text-md font-heading text-secondaryBg">
                        App-only Deals
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/home/check.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                      <span className="text-md font-heading text-secondaryBg">
                        Easy Trip Planning
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-6">
                  <div className="hidden rounded bg-secondaryBg p-[2px] md:inline-block">
                    <Image
                      src={"/images/home/qr.png"}
                      alt=""
                      width={210}
                      height={210}
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex items-start justify-start gap-8">
                      <div className="relative pe-6 text-secondaryBg">
                        <h1 className="font-heading text-[32px] ">100K+</h1>
                        <p>Daily Users</p>
                        <Separator
                          orientation="vertical"
                          className="absolute right-0 top-0 h-full w-[1px] bg-[#bbbbbb]"
                        />
                      </div>
                      <div className="relative pe-6 text-secondaryBg">
                        <h1 className="font-heading text-[32px] ">500+</h1>
                        <p className="text-xs md:text-[15px]">
                          Daily Downloads
                        </p>
                        <Separator
                          orientation="vertical"
                          className="absolute right-0 top-0 h-full w-[1px] bg-[#bbbbbb]"
                        />
                      </div>
                      <div className="relative text-secondaryBg">
                        <h1 className="font-heading text-[32px] ">4.7</h1>
                        <p>Ratings</p>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <Link
                        href={
                          "https://apps.apple.com/pk/app/booking-expert/id6502252750"
                        }
                        target="_blank"
                      >
                        <Image
                          src={"/images/home/ios.png"}
                          alt=""
                          width={120}
                          height={120}
                        />
                      </Link>
                      <Link
                        href={
                          "https://play.google.com/store/apps/details?id=com.m360ict.bookingExpert"
                        }
                        target="_blank"
                      >
                        <Image
                          src={"/images/home/android.png"}
                          alt=""
                          width={120}
                          height={120}
                        />
                      </Link>
                    </div>
                    <div>
                      <p className="mt-5 hidden text-white md:block">
                        Scan the QR code to download the app
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="absolute top-[-100px] xl:left-[65%] 2xl:left-[59%]">
                <Image
                  src={"/images/home/phone.png"}
                  alt=""
                  width={368}
                  height={200}
                  className="animate-mover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppPromo
