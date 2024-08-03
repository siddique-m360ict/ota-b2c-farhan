import React from "react"
import { fetchSingleTransaction } from "../../actions"
import { getCookies } from "@/lib/token/getCookies"
import SuccessPage from "./SuccessPage"

const PaymentSuccessPage = async ({ params }) => {
  const id = params.id
  const token = await getCookies()

  const response = await fetchSingleTransaction(id, token)

  return (
    <div>
      <SuccessPage paymentData={response?.data[0]} />
    </div>
  )
}

export default PaymentSuccessPage
