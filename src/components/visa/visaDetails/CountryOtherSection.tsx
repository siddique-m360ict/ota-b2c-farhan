"use client"
import React from "react"

type Props = {
  countrySections: any
}
const CountryOtherSection = ({ countrySections }: Props) => {
  return (
    <>
      {countrySections.map((section) => (
        <section
          className="my-5 rounded-[10px] bg-white p-[20px]"
          id={`country-${section.name.toLowerCase().replace(/ /g, "-")}`}
        >
          <div className="mb-[15px] text-left md:mb-[30px]">
            <h2
              className="w-[70%] text-[30px] font-[600]"
              dangerouslySetInnerHTML={{ __html: section.title }}
            />
            <div
              className="prose mt-5 max-w-full text-[16px] leading-[28px] text-[#666885]"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        </section>
      ))}
    </>
  )
}

export default CountryOtherSection
