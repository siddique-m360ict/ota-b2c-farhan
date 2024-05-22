import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { paxType } from "../addTravelerForm"
import { referenceType } from "@/components/flight-revalidate/elements/FormField"

type Props = {
  setPaxType: Dispatch<SetStateAction<paxType>>
  reference: referenceType
  paxType: paxType
}

type PassengerType = {
  name: "Adult" | "Child" | "Infant"
  value: paxType
  rules: string
}

const PassengerTypes = ({ reference, setPaxType, paxType }: Props) => {
  const [passengerTypes, setPassengerTypes] = useState<PassengerType[]>([])

  useEffect(() => {
    if (reference === "MR" || reference === "MS" || reference === "MRS") {
      setPassengerTypes([
        { name: "Adult", value: "ADT", rules: "(Must be older than 11 Years)" },
      ])
      setPaxType("ADT")
    } else if (reference === "MASTER" || reference === "MISS") {
      setPassengerTypes([
        { name: "Child", value: "C11", rules: "(Must be 2 - 11 Years)" },
        { name: "Infant", value: "INF", rules: "(Must be 0 - 1 Years)" },
      ])
      setPaxType("C11")
    }
  }, [reference])

  useEffect(() => {
    if (paxType) setPaxType(paxType)
  }, [paxType])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaxType(e.target.value as paxType)
  }

  return (
    <div className="relative flex flex-col">
      <label className="mb-1 text-sm">Passenger Type</label>
      <div className="booking_input">
        <select
          onChange={(e) => handleChange(e)}
          value={paxType}
          className="w-full text-sm"
        >
          {passengerTypes.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name} {item.rules}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PassengerTypes
