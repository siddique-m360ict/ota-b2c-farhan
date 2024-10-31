import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppPromo = () => {
  const popularFlights = [
    { to: 'Dhaka' },
    { to: 'Bangkok' },
    { to: 'Chittagong' },
    { to: 'Kathmandu' }
  ];

  const popularRoutes = [
    { to: 'Kuala Lumpur' },
    { to: 'Phuket' },
    { to: 'Singapore' },
    { to: 'New York' }
  ];

  const additionalRoutes = [
    { to: 'Subang' },
    { to: 'Kolkata' },
    { to: "Cox's Bazar" },
    { to: 'Jeddah' }
  ];

  return (
    <div className="w-full">
      <div>
        <div
          style={{
            width: "100%",
            background: "red",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(/images/footer/bg.webp)`,
            backgroundPosition: "50%",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            lineHeight: "normal",
          }}
          className="relative"
        >
          <div className="h-full px-6 py-28 md:container md:px-8">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h1 className="font-heading text-[35px] leading-tight text-secondaryBg md:text-[52px]">
                  Your all-in-one travel app
                </h1>
                <div>
                  <div className="mt-6 inline-block rounded-full px-6 py-4 md:mt-8 md:py-[16px]">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/home/check.png"
                          alt=""
                          width={28}
                          height={28}
                        />
                        <span className="font-heading text-xl text-secondaryBg">
                          App-only Deals
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/home/check.png"
                          alt=""
                          width={28}
                          height={28}
                        />
                        <span className="font-heading text-xl text-secondaryBg">
                          Easy Trip Planning
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 flex gap-8">
                    <div className="hidden rounded p-[3px] md:inline-block">
                      <Image
                        src="/images/home/qr.png"
                        alt=""
                        width={250}
                        height={250}
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex items-start justify-start gap-10">
                        <div className="relative pe-8 text-secondaryBg">
                          <h1 className="font-heading text-[40px]">100K+</h1>
                          <p className="text-lg">Daily Users</p>
                          <Separator
                            orientation="vertical"
                            className="absolute right-0 top-0 h-full w-px bg-[#bbbbbb]"
                          />
                        </div>
                        <div className="relative pe-8 text-secondaryBg">
                          <h1 className="font-heading text-[40px]">500+</h1>
                          <p className="text-lg">Daily Downloads</p>
                          <Separator
                            orientation="vertical"
                            className="absolute right-0 top-0 h-full w-px bg-[#bbbbbb]"
                          />
                        </div>
                        <div className="relative text-secondaryBg">
                          <h1 className="font-heading text-[40px]">4.7</h1>
                          <p className="text-lg">Ratings</p>
                        </div>
                      </div>
                      <div className="mt-8 flex gap-4">
                        <Link
                          href="https://apps.apple.com/pk/app/booking-expert/id6502252750"
                          target="_blank"
                        >
                          <Image
                            src="/images/home/ios.png"
                            alt=""
                            width={160}
                            height={160}
                          />
                        </Link>
                        <Link
                          href="https://play.google.com/store/apps/details?id=com.m360ict.farhantravels"
                          target="_blank"
                        >
                          <Image
                            src="/images/home/android.png"
                            alt=""
                            width={160}
                            height={160}
                          />
                        </Link>
                      </div>
                      <div>
                        <p className="mt-6 hidden text-lg text-white md:block">
                          Scan the QR code to download the app
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="absolute top-[-90px] xl:left-[65%] 2xl:left-[59%]">
                  <Image
                    src="/images/home/phone.png"
                    alt=""
                    width={450}
                    height={250}
                    className="animate-mover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromo;
