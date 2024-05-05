import React from "react"

const Policy = () => {
  return (
    <div className="tab-content">
      <div className="mt-3 space-y-2">
        <p>
          <span className="font-semibold"> Cancellation: </span>
          Refund Amount = Paid Amount - Airline Cancellation Fee
        </p>

        <p>
          <span className="font-semibold"> Re-issue: </span>
          Re-issue Fee = Airline Fee + Fare Difference
        </p>

        <p>
          *The {"airline's"} fee is indicative and per person. Convenience fee
          is non-refundable.
        </p>
      </div>
    </div>
  )
}

export default Policy
