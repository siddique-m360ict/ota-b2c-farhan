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
      <div className="pb-24 pt-16">
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
                    <div className="hidden rounded bg-secondaryBg p-[3px] md:inline-block">
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
                          href="https://play.google.com/store/apps/details?id=com.m360ict.bookingExpert"
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
                <div className="absolute top-[-120px] xl:left-[65%] 2xl:left-[59%]">
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

      {/* Feedback and Flights Section */}
      <div className="mx-auto max-w-6xl space-y-16 p-8">
        <Card className="p-8 text-center">
          <CardContent className="space-y-6">
            <h2 className="text-4xl font-semibold text-gray-800">Your Feedback Counts!</h2>
            <p className="text-xl text-gray-600">We'd love to hear about your recent experience</p>
            <Button
              variant="outline"
              className="border-red-500 px-8 py-6 text-lg text-red-500 hover:bg-red-500 hover:text-white"
            >
              Share Your Feedback
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold text-gray-800">Don't miss out!</h2>
          <p className="text-xl text-gray-600">Explore the world and stay anywhere conveniently</p>
        </div>

        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger
              value="flights"
              className="flex-1 py-6 text-lg data-[state=active]:text-red-500"
            >
              Top Popular Flights
            </TabsTrigger>
            <TabsTrigger
              value="routes"
              className="flex-1 py-6 text-lg data-[state=active]:text-red-500"
            >
              Top Popular Routes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights" className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {popularFlights.map((flight, index) => (
                <a
                  key={index}
                  href={`/flight-to-${flight.to.toLowerCase()}`}
                  className="p-4 text-xl text-red-600 hover:underline"
                >
                  Flight to {flight.to}
                </a>
              ))}
              {popularRoutes.map((route, index) => (
                <a
                  key={index}
                  href={`/flight-to-${route.to.toLowerCase()}`}
                  className="p-4 text-xl text-red-600 hover:underline"
                >
                  Flight to {route.to}
                </a>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="routes" className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {additionalRoutes.map((route, index) => (
                <a
                  key={index}
                  href={`/flight-to-${route.to.toLowerCase()}`}
                  className="p-4 text-xl text-blue-600 hover:underline"
                >
                  Flight to {route.to}
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppPromo;
