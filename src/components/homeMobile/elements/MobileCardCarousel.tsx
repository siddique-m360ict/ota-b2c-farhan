import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import React from "react"

export const MobileCardCarousel = () => {
  const cardItems = [
    {
      id: 1,
      img: "/images/home/mobile/cardCarousel/promo.webp",
    },
    {
      id: 2,
      img: "/images/home/mobile/cardCarousel/promo2.webp",
    },
  ]

  const promoTitle = [
    { img: "/images/home/secured.webp", name: "Secure Payment" },
    { img: "/images/home/love.webp", name: "Support in Approx. 30s" },
  ]
  return (
    <div className="px-3">
      <div className="flex justify-center gap-6 ">
        {promoTitle.map((item, index) => (
          <div
            key={index}
            className="box relative flex gap-2 text-[14px] font-[400] text-destructive"
          >
            <Image
              src={item.img}
              alt={"secured image"}
              width={20}
              height={20}
            />
            <p className="relative">
              {item.name}
              <span
                className="absolute bottom-0 left-0"
                style={{
                  border: "none",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4) 2px, transparent 0px, transparent 4px, rgba(255, 255, 255, 0.4) 0px)",
                  height: "1px",
                  width: "100%",
                }}
              ></span>
            </p>
          </div>
        ))}
      </div>

      {/* card carousel */}
      <div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 2000 })]}
          className="z-50"
        >
          <CarouselContent>
            {cardItems &&
              cardItems?.map((cardInfo) => (
                <CarouselItem
                  className="  m-1 flex w-full justify-between gap-0 py-2"
                  key={cardInfo.id}
                >
                  <Image
                    src={cardInfo.img}
                    alt={cardInfo.img}
                    height={500}
                    width={500}
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-md"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
