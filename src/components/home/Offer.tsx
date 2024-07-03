import { Rubik } from "next/font/google"
import Image from "next/image"
import React from "react"
import HomeCardCarousel from "./HomeCardCarousel"

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
})

const Offer = () => {
  return (
    <div
      style={{
        backgroundColor: "#cce6ffb8",
        backgroundImage: "url(/images/bg/bottom-shape.webp)",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        padding: "58px 0px 200px",
      }}
      className="relative hidden md:block"
    >
      {/* <div
        className="absolute top-[-20px] h-8 w-full bg-[#cce6ffb8] md:h-10"
        style={{ borderRadius: "24px 24px 0 0" }}
      ></div> */}
      <div className="container mx-auto"></div>
    </div>
  )
}

export default Offer
