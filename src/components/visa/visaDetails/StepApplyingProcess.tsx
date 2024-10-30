"use client"
import React from "react"

type Props = {
  countryPage: any
  countryVisaSteps: any
}
const StepApplyingProcess = ({ countryPage, countryVisaSteps }: Props) => {
  return (
    <section className="my-4" id="country-applying-process">
      <div className="section_intro mb-[15px] text-left md:mb-[30px]">
        <h2
          className="w-4/5 text-[30px] font-[600]"
          dangerouslySetInnerHTML={{ __html: countryPage.visaStepSectionTitle }}
        />
        <div
          className="mt-1 text-[16px] leading-[28px] text-[#666885]"
          dangerouslySetInnerHTML={{
            __html: countryPage.visaStepSectionDescription,
          }}
        />
      </div>
      {/* main step data */}
      {countryVisaSteps && countryVisaSteps.length > 0 && (
        <div>
          {countryVisaSteps.map((step) => (
            <div>
              <div
                className="bg-[#2e90fa] "
                style={{
                  borderRadius: "10px 10px 0 0",
                  padding: "15px 20px 15px 30px",
                }}
              >
                <h3 className="bg-[#2e90fa] text-[20px] font-[600] text-white">
                  {step.title}
                </h3>
              </div>
              <div
                style={{
                  padding: "17px 0 21px 11px",
                }}
                className="bg-white"
              >
                <div
                  className="bg mb-[20px]  text-[16px] leading-[28px] text-[#666885]"
                  style={{
                    paddingInline: "20px",
                  }}
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default StepApplyingProcess
