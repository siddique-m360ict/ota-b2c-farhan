import React from "react"

const FlightDataGet = ({ searchParams }: any) => {
  console.log(searchParams)
  return <div>FlightDataGet {searchParams?.departuredate} </div>
}

export default FlightDataGet
