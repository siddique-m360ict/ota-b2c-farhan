"use client"
import React from "react"

type Props = {
  countryPage: any
}
const TypeOfVisa = ({ countryPage }: Props) => {
  return (
    <section id="country-type-of-visa">
      {/* visa type section title and description */}
      <div className="mb-[15px] text-left md:mb-[30px]">
        <h2
          className="w-[70%] text-[32px] font-[600]"
          dangerouslySetInnerHTML={{ __html: countryPage.visaTypeSectionTitle }}
        />
        <div
          className="mt-3 text-[16px] leading-[28px] text-[#666885]"
          dangerouslySetInnerHTML={{
            __html: countryPage.visaTypeSectionDescription,
          }}
        />
      </div>
      {/* visa type section content */}
      {countryPage.visaTypeSectionContent.map((section, index) => (
        <div
          key={index}
          className={`term-visa-list prose relative my-4 max-w-full rounded-[10px] p-[15px] md:p-[30px]`}
          style={{
            backgroundColor: section.bgColor,
            opacity: 1,
            transform: "none",
          }}
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      ))}
    </section>
  )
}

export default TypeOfVisa
