import React from "react"
import { fetchSingleTransaction } from "../../actions"
import { getCookies } from "@/lib/token/getCookies"
import FailedPage from "./FailedPage"

const PaymentFailedPage = async ({ params }) => {
  const id = params.id
  const token = getCookies()
  const response = await fetchSingleTransaction(id, token)

  return (
    <div>
      <FailedPage paymentData={response?.data[0]} />
    </div>
  )
}

export default PaymentFailedPage
