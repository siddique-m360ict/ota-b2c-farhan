import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React, { Suspense } from "react"
import dynamic from "next/dynamic"

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return <h1>{searchParams?.departuredate || "Hello!"}</h1>
}
