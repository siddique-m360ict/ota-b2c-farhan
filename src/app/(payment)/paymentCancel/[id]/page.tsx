import React from "react"
import { fetchSingleTransaction } from "../../actions"
import { getCookies } from "@/lib/token/getCookies"
import CancelPage from "./CancelPage"

const PaymentCancelPage = async ({ params }) => {
  const id = params.id
  const token = getCookies()
  const response = await fetchSingleTransaction(id, token)

  return (
    <div>
      <CancelPage paymentData={response?.data[0]} />
    </div>
  )
}

export default PaymentCancelPage
