import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import React from "react"

const Atlanta = () => {
  const data = [
    {
      id: 1,
      name: "DoubleTree by Hilton at The Entrance",
      img: "/images/home/properties/Atlanta1.webp",
      review: "4.4",
      reviewCount: "140",
      price: "15200",
    },
    {
      id: 2,
      name: "Millennium Hilton New York One UN Plaza",
      review: "4.3",
      img: "/images/home/properties/Atlanta2.webp",
      reviewCount: "51",
      price: "14000",
    },
    {
      id: 4,
      name: "The Westin Peachtree Plaza, Atlanta",
      img: "/images/home/properties/Atlanta4.webp",
      review: "3.8",
      reviewCount: "120",
      price: "12000",
    },
    {
      id: 5,
      name: "The Westin Peachtree Plaza, Atlanta",
      img: "/images/home/properties/Atlanta3.webp",
      review: "3.8",
      reviewCount: "120",
      price: "12000",
    },
  ]
  return (
    <Card className="grid grid-cols-2 gap-2 border-none bg-transparent  px-0 md:grid-cols-5 md:gap-4">
      {data.map((item, index) => (
        <CardContent className="w-full bg-secondaryBg p-0 shadow-xl">
          <div className="relative h-[200px] w-full ">
            <Image
              src={item.img}
              alt="home-image"
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <div className="px-4 pb-2 pt-4">
            <div className="flex items-center gap-2 ">
              <h1 className="text-[16px] font-bold">{item.name}</h1>
              <span className="flex">
                <Icons.Star size={18} color="#FFB400" calcMode={100} />
                <Icons.Star size={18} color="#FFB400" calcMode={100} />
                <Icons.Star size={18} color="#FFB400" calcMode={100} />
                <Icons.Star size={18} color="#FFB400" calcMode={100} />
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              <h2 className="inline rounded bg-[#00429B] px-2 text-sm text-white">
                {item.review}
              </h2>
              <h3 className="text-sm font-bold text-[#00429B]">
                {item.reviewCount} reviews
              </h3>
            </div>
          </div>
          <CardFooter className="m-0 flex justify-end  gap-1 px-4 pb-3 pt-0">
            <span className="text-sm text-destructive"> From </span>{" "}
            <p className="text-[20px] font-bold text-secondary">
              {" "}
              ৳{item.price}
            </p>
          </CardFooter>
        </CardContent>
      ))}
      <CardContent className="w-full bg-secondaryBg p-0 shadow-xl">
        <div className="relative h-full w-full ">
          <Image
            src={"/images/home/properties/bad.png"}
            alt="home-image"
            layout="fill"
            className="rounded-lg"
          />
          <div
            className="absolute bottom-0 px-4 "
            style={{
              background:
                "linear-gradient(180deg,transparent,#5a9aa5 48px,#5a9aa5)",
              padding: "77px 16px 16px",
            }}
          >
            <h2 className="mb-2 font-heading font-bold leading-5 text-white">
              Discover great deals on hotels around the world
            </h2>
            <button
              className={cn(
                "mb-4 mt-1 w-full rounded-none",
                buttonVariants({ size: "sm" })
              )}
            >
              Go Now
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Atlanta
