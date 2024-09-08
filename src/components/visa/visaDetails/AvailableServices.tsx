"use client"
import Image from "next/image"
import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel"
import {
  DotButton,
  useDotButton,
} from "@/components/visa/elements/EmblaCarouselDotButton"
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/visa/elements/EmblaCarouselArrowButtons"
import "@/components/visa/style/visaEmblaCarousel.css"

type Props = {
  countryPage: any
  serviceTypes: any
  visaFees: any
}
const AvailableServices = ({ countryPage, serviceTypes, visaFees }: Props) => {
  const options: EmblaOptionsType = { slidesToScroll: "auto" }
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop
    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="my-14" id="country-available-services">
      <div className="section_intro mb-[15px] text-left md:mb-[30px]">
        <h2
          className="w-[80%] text-[30px] font-[600]"
          dangerouslySetInnerHTML={{ __html: countryPage.serviceSectionTitle }}
        />
        <div
          className="mt-3 text-[16px] leading-[28px] text-[#666885]"
          dangerouslySetInnerHTML={{
            __html: countryPage.serviceSectionDescription,
          }}
        />
      </div>

      {/* visa services type  */}
      <div className="my-6 grid grid-cols-2 gap-4">
        {serviceTypes.map((serviceType, index) => (
          <div className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#d1e9ff] bg-white p-[10px]">
            <div className="flex items-center gap-[16px]">
              <span className="rounded-[5px] bg-[#eff8ff] p-[10px] text-[#2f3268]">
                <Image
                  src={"/images/visa/message.svg"}
                  alt=""
                  width={25}
                  height={25}
                />
              </span>
              <p className="text-[18px] font-[500] leading-normal text-[#0f0f24]">
                {serviceType.title}
              </p>
            </div>
            <div className="me-2">
              <Image
                src={"/images/visa/arrow.svg"}
                alt=""
                width={20}
                height={20}
              />
            </div>
          </div>
        ))}
      </div>

      {/* visaFees */}
      {visaFees && visaFees.length > 0 && (
        <section className="embla py-5">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {visaFees.map((fees, index) => (
                <div className="embla__slide" key={index}>
                  <div className="rounded-[10px] border border-[#eaebf0] bg-white p-[10px] ">
                    <div className="text-center">
                      <p className="text-[.875rem] leading-[1.25rem] text-[#595b86]">
                        {fees.visaCategory.title}
                      </p>
                      <h2 className="text-[15px] font-[500] text-[#14152c]">
                        {fees.noOfEntries} {" | "}{" "}
                        {fees.visaCategory.periodOfStay}
                      </h2>
                    </div>
                    <hr className="mt-[12px] bg-[#eaebf0]" />

                    <div className="mt-[10px] rounded-[5px] bg-[#f9f9fb] px-[10px] py-[6px] text-center">
                      <p className="text-[.75rem] leading-[1rem] text-[#666885]">
                        Processing Time
                      </p>
                      <p className="text-[.875rem] leading-[1.25rem] text-[#595b86]">
                        <span>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={0}
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 30 30"
                            className="inline-block"
                            height={16}
                            width={16}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.74,14.47c0-2.04,0.51-3.93,1.52-5.66s2.38-3.1,4.11-4.11s3.61-1.51,5.64-1.51c1.52,0,2.98,0.3,4.37,0.89
s2.58,1.4,3.59,2.4s1.81,2.2,2.4,3.6s0.89,2.85,0.89,4.39c0,1.52-0.3,2.98-0.89,4.37s-1.4,2.59-2.4,3.59s-2.2,1.8-3.59,2.39
s-2.84,0.89-4.37,0.89c-1.53,0-3-0.3-4.39-0.89s-2.59-1.4-3.6-2.4s-1.8-2.2-2.4-3.58S3.74,16,3.74,14.47z M6.22,14.47
c0,2.37,0.86,4.43,2.59,6.18c1.73,1.73,3.79,2.59,6.2,2.59c1.58,0,3.05-0.39,4.39-1.18s2.42-1.85,3.21-3.2s1.19-2.81,1.19-4.39
s-0.4-3.05-1.19-4.4s-1.86-2.42-3.21-3.21s-2.81-1.18-4.39-1.18s-3.05,0.39-4.39,1.18S8.2,8.72,7.4,10.07S6.22,12.89,6.22,14.47z
M14.14,14.47V7.81c0-0.23,0.08-0.43,0.24-0.59s0.36-0.24,0.59-0.24s0.43,0.08,0.59,0.24s0.24,0.36,0.24,0.59v5.82h3.78
c0.23,0,0.43,0.08,0.59,0.24s0.24,0.36,0.24,0.59c0,0.22-0.08,0.42-0.24,0.59c-0.16,0.17-0.36,0.25-0.59,0.25h-4.44
c-0.03,0.01-0.09,0.01-0.18,0.01c-0.23,0-0.43-0.08-0.59-0.24S14.14,14.71,14.14,14.47z"
                            />
                          </svg>
                        </span>
                        <span className="ps-[5px] text-[#0f0f24]">
                          {fees.processedTime}
                        </span>
                      </p>
                    </div>

                    <div className="mt-[10px] rounded-[5px] bg-[#f9f9fb] px-[10px] py-[6px] text-center">
                      <p className="text-[.75rem] leading-[1rem] text-[#666885]">
                        Service Available
                      </p>
                      <p className="text-[.875rem] leading-[1.25rem] text-[#595b86]">
                        <span className="ps-[5px] text-[#0f0f24]">
                          {fees.services[0].serviceTitle}
                        </span>
                      </p>
                    </div>
                    <hr className="mt-[12px] bg-[#eaebf0]" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center  gap-[5px]">
                        <Image
                          src={fees.country.flag}
                          alt=""
                          width={35}
                          height={35}
                          className="rounded"
                        />
                        <p className="font-[500] text-[#353755]">
                          {fees.country.title}
                        </p>
                      </div>
                      <div className="flex flex-col text-[1.125rem] font-[600] leading-[1.75rem] text-[#0f0f24]">
                        <p className="mb-[-.5rem] text-[11px] text-[#666885]">
                          Visa Fee
                        </p>
                        <p>
                          {fees.currency.currencySymbol} {fees.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />

            <div className="embla__dots gap-3">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>

            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </section>
      )}
    </section>
  )
}

export default AvailableServices
