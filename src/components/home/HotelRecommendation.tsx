'use client'

import { useState } from 'react'
import { Star, Hotel } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const cities = ['Bangkok', 'Kuala Lumpur', "Cox's Bazar", 'Dhaka', 'Singapore', 'Patong Beach']

const hotels = [
  {
    id: 1,
    name: 'Aira Hotel Bangkok Sukhumvit 11',
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/max3000/390793633.jpg?k=0a97f949c0e2aaf62dfa27cace793fc6cc91eb50dae0997f720286dd5a14bd68&o=',
    rating: 8.4,
    stars: 4,
    price: 10497,
  },
  {
    id: 2,
    name: 'Sindhorn Midtown Hotel Bangkok, Vignette Collection, an IHG Hotel',
    image: '',
    rating: 9.1,
    stars: 5,
    price: 19624,
  },
]

export default function HotelRecommendation() {
  const [selectedCity, setSelectedCity] = useState('Bangkok')

  return (
    <section className="container mb-40">
      <div>
        <h2 className="mb-8 ms-10 text-4xl font-bold">Exclusive Hotel Recommendations</h2>

        <div className="mb-20 ms-10 flex gap-x-6 overflow-x-auto pb-4 ">
  {cities.map((city) => (
    <Button
      key={city}
      onClick={() => setSelectedCity(city)}
      className={`
        min-w-[160px] whitespace-nowrap px-8 py-7 text-lg
        transition-all duration-300 hover:scale-105
        ${selectedCity === city
          ? "bg-[#DC143C] text-white shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          : "border border-input bg-transparent text-black hover:bg-gray-50  dark:text-white  dark:hover:bg-gray-800"}
      `}
    >
      {city}
    </Button>
  ))}
</div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="group ms-10 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-[320px] overflow-hidden">
                <div className="absolute right-0 top-0 z-10 rounded-bl bg-red-500 px-4 py-3 text-lg font-bold text-white">
                  {hotel.rating}/10
                </div>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="size-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-bold leading-tight hover:text-red-500">
                  {hotel.name}
                </h3>
                <div className="mb-4 flex">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-6 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-end">
                  <span className="mr-2 text-lg text-gray-600">From</span>
                  <span className="text-2xl font-bold text-red-500">
                    Tk {hotel.price.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Button
          variant="outline"
          className="px-10 py-7 text-lg transition-all duration-300 hover:scale-105"
        >
          Discover More in {selectedCity}
        </Button>
      </div>
    </section>
  )
}
