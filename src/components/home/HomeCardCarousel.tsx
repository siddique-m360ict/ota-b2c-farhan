"use client"
import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

const HomeCardCarousel = () => {
  const cardItems = [
    {
      id: 1,
      img: "/images/home/carousel1.jpg",
    },
    {
      id: 2,
      img: "/images/home/carousel2.jpg",
    },
    {
      id: 3,
      img: "/images/home/carousel1.jpg",
    },
    {
      id: 4,
      img: "/images/home/carousel2.jpg",
    },
  ]
  return (
    <div className="relative">
      <div
        className="absolute top-[-20px] z-0  h-8 w-full bg-secondaryBg md:h-10"
        style={{ borderRadius: "24px 24px 0 0" }}
      ></div>
      <div className="container">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[Autoplay({})]}
        >
          <CarouselContent>
            {cardItems &&
              cardItems?.map((cardInfo) => (
                <CarouselItem
                  className="m-1 flex w-full justify-between gap-0 py-2  md:basis-[27%]"
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

export default HomeCardCarousel