import Image from "next/image"
import React from "react"
import "@/components/visa/style/visaStyle.css"
import visaDetails from "../../../../../public/data/visa/visaDetails.json"
import VisaDetailsHeader from "@/components/visa/visaDetails/VisaDetailsHeader"
import VisaDetailsSubNav from "@/components/visa/visaDetails/VisaDetailsSubNav"
import TypeOfVisa from "@/components/visa/visaDetails/TypeOfVisa"
import AvailableServices from "@/components/visa/visaDetails/AvailableServices"
import StepApplyingProcess from "@/components/visa/visaDetails/StepApplyingProcess"
import PromotionVisa from "@/components/visa/visaDetails/PromotionVisa"
import CountryOtherSection from "@/components/visa/visaDetails/CountryOtherSection"
import VisaFaq from "@/components/visa/visaDetails/VisaFaq"
import VisaSidebar from "@/components/visa/visaDetails/VisaSidebar"
import DetailsDataUnderProcessing from "@/components/visa/visaDetails/DetailsDataUnderProcessing"

const page = ({ params }: { params: { country: string } }) => {
  const filterVisaDetails = visaDetails.filter(
    (detail) =>
      detail.country.title.toLowerCase() === params.country.toLowerCase()
  )
  if (filterVisaDetails.length === 0) {
    return <DetailsDataUnderProcessing />
  }

  const country = filterVisaDetails[0].country
  const countryPage = filterVisaDetails[0].countryPage
  const serviceTypes = filterVisaDetails[0].serviceTypes
  const visaFees = filterVisaDetails[0].visaFees
  const countryVisaSteps = filterVisaDetails[0].countryVisaSteps
  const countrySections = filterVisaDetails[0].countrySections
  const countryFaqs = filterVisaDetails[0].countryFaqs

  return (
    <div>
      {/* header section  done with dynamic*/}
      <VisaDetailsHeader country={country} countryPage={countryPage} />

      {/* main content */}
      <div className="main-content ">
        {/* main content header */}
        <VisaDetailsSubNav
          countrySections={countrySections}
          countryFaqs={countryFaqs}
        />

        {/* main content */}
        <div className="container mt-6">
          <div className="grid grid-cols-6 gap-7">
            <div className="col-span-4">
              <TypeOfVisa countryPage={countryPage} />

              {/* visa services > visa processing */}
              <AvailableServices
                countryPage={countryPage}
                serviceTypes={serviceTypes}
                visaFees={visaFees}
              />

              {/* visa country step || applying process */}
              <StepApplyingProcess
                countryPage={countryPage}
                countryVisaSteps={countryVisaSteps}
              />

              {/* promotion Title */}
              {countryPage.promotionDescription.length > 0 && (
                <PromotionVisa countryPage={countryPage} />
              )}

              {/* country Sections */}
              <CountryOtherSection countrySections={countrySections} />

              {/* FAQ */}
              {countryFaqs && countryFaqs.length > 0 && (
                <VisaFaq country={country} countryFaqs={countryFaqs} />
              )}

              {/* Conclusion */}
              <div className="relative rounded-[16px] bg-[#e0f2fe] p-[30px] pr-[150px]">
                <h2 className="relative z-[1] text-[30px] text-[#0f0f24] ">
                  Conclusion
                </h2>
                <div
                  className="relative z-[1] mt-[16px] text-[16px] leading-[28px] text-[#353755] "
                  dangerouslySetInnerHTML={{ __html: countryPage.conclusion }}
                />

                <div className="absolute right-0 top-[50%] max-w-[300px] translate-y-[-50%]">
                  <Image
                    src={"/images/visa/colclution_thumb.svg"}
                    alt=""
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>

            {/* side section */}
            <VisaSidebar country={country} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
