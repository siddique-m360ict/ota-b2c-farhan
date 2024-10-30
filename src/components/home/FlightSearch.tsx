"use client"
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Clipboard } from "lucide-react";
import MultiCity from "./elements/MultiCity";
import OneWay from "./elements/OneWay";
import RoundWay from "./elements/RoundWay";
import SelectClass from "./elements/SelectClass";
import SelectPassenger from "./elements/SelectPassenger";
import SelectRoute from "./elements/SelectRoute";

export interface Passenger {
  adult: number;
  kids: number;
  children: number;
  infant: number;
}

type Props = {
  home?: boolean;
  className?: string;
};

const FlightSearch = ({ home, className }: Props) => {
  const [passenger, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  });
  const [cabinClass, setCabinClass] = useState<string>("Y");
  const [activeRoute, setActiveRoute] = useState("roundtrip");

  const routeContent = [
    {
      id: "oneway",
      element: <OneWay cabinClass={cabinClass} passenger={passenger} />,
    },
    {
      id: "roundtrip",
      element: <RoundWay cabinClass={cabinClass} passenger={passenger} />,
    },
    {
      id: "multicity",
      element: <MultiCity cabinClass={cabinClass} passenger={passenger} />,
    },
  ];

  useEffect(() => {
    const localRoute = localStorage.getItem("route");
    const localClass = localStorage.getItem("class");
    const localPassenger = JSON.parse(localStorage.getItem("passenger"));
    localRoute && setActiveRoute(localRoute);
    localClass && setCabinClass(localClass);
    localPassenger && setPassenger(localPassenger);
  }, []);

  return (

    <>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-4 md:gap-5">
            <SelectRoute
              activeRoute={activeRoute}
              setActiveRoute={setActiveRoute}
            />
            <SelectPassenger
              setPassenger={setPassenger}
              passenger={passenger}
            />
            <SelectClass
              cabinClass={cabinClass}
              setCabinClass={setCabinClass}
            />
          </div>

          {/* Order List Button */}
          <div className="mb-5 hidden md:block">
            <button className="flex items-center gap-2 text-[#E31837] transition-colors hover:text-[#c41530]">
              <Clipboard className="size-5" />
              Order List
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Route Content */}
        <div className="my-4">
          {routeContent.map(
            (route, index) =>
              route.id === activeRoute && (
                <div key={index} className="duration-300 animate-in fade-in slide-in-from-top-4">
                  {route.element}
                </div>
              )
          )}
        </div>
        </>
  );
};

export default FlightSearch;
