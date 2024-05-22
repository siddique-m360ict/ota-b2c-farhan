import { Suspense } from "react"
import { fetchSingleVisa } from "../actions"
import ReviewBookVisa from "@/components/visa/ReviewBookVisa"
import { getCookies } from "@/lib/token/getCookies"

export default async function VisaBookPage({ params, searchParams }) {
  return (
    <Suspense fallback={<>Loading......</>}>
      <BookVisa searchParams={searchParams} />
    </Suspense>
  )
}

const BookVisa = async (props: any) => {
  const res = await fetchSingleVisa(props?.searchParams.visa_id)
  const token = getCookies()
  return (
    <ReviewBookVisa
      data={res?.data}
      token={token}
      id={props?.searchParams.visa_id}
    />
  )
}

export const dynamic = "force-dynamic"
