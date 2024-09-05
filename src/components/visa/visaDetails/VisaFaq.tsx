"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react"

type Props = {
  country: any
  countryFaqs: any
}
const VisaFaq = ({ country, countryFaqs }: Props) => {
  return (
    <section className="faq py-10" id="country-faq">
      <h2 className="relative z-[1] text-[30px] font-[700] text-[#0f0f24]">
        FAQ for <span className="text-primary"> {country.title} Visa</span> Visa
      </h2>
      <div className="mt-3 bg-white p-[20px]">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={countryFaqs.map((item) => item.statement)}
        >
          {countryFaqs.map((faq) => (
            <AccordionItem value={faq.statement}>
              <AccordionTrigger>{faq.statement}</AccordionTrigger>
              <AccordionContent className="text-[#389e0d]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default VisaFaq
