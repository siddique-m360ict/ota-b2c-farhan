import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import InternationalRoutes from "@/components/home/elements/PopularRoutesElements/InternationalRoutes"

const DEMO_CATS = [
  {
    id: "1",
    href: "#",
    name: "New Yourk",
    taxonomy: "category",
    count: 1882,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "#",
    name: "Singapore",
    taxonomy: "category",
    count: 8288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "#",
    name: "Paris",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "#",
    name: "London",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "5",
    href: "#",
    name: "Tokyo",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "6",
    href: "#",
    name: "Maldives",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "#",
    name: "New Yourk",
    taxonomy: "category",
    count: 1775,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "8",
    href: "#",
    name: "Singapore",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
]
export const metadata = {
  title: "Flights",
}
const SectionGridCategoryBox = ({ categories = DEMO_CATS }) => {
  return (
    <div className={`relative `}>
      <div className="text-center">
        <h1 className="font-heading text-[28px] font-bold">Explore nearby</h1>
        <p className="text-sm">Discover great places near where you live</p>
      </div>
      <div className={`mb-10 mt-6`}>
        <InternationalRoutes />,
      </div>
    </div>
  )
}

export default SectionGridCategoryBox
