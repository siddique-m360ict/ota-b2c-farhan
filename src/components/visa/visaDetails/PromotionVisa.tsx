"use client"
import React from "react"

type Props = {
  countryPage: any
}
const PromotionVisa = ({ countryPage }: Props) => {
  return (
    <section className="rounded-[10px] bg-[#f5fbff] p-[20px] px-6">
      <div className="mb-[15px] text-left md:mb-[30px]">
        <h2 className="w-[70%] text-[30px] font-[600]">
          {countryPage.promotionTitle}
        </h2>
        <div
          className="prose mt-[25px] max-w-full text-left text-[16px] leading-[28px] text-[#666885]"
          dangerouslySetInnerHTML={{
            __html: countryPage.promotionDescription,
          }}
        />
      </div>
    </section>
  )
}

export default PromotionVisa
