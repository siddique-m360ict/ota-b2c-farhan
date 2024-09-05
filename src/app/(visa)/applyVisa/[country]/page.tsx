import VisaDetailsHeader from "@/components/visa/visaDetails/VisaDetailsHeader"
import React from "react"
import visaDetails from "../../../../../public/data/visa/visaDetails.json"
import DetailsDataUnderProcessing from "@/components/visa/visaDetails/DetailsDataUnderProcessing"
import ApplyDetailsHeader from "@/components/visa/applyVisa/ApplyDetailsHeader"
import "@/components/visa/applyVisa/visaApply.css"

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

  return (
    <div>
      <ApplyDetailsHeader country={country} countryPage={countryPage} />
    </div>
  )
}

export default page
