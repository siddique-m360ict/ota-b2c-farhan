import { format } from "date-fns"
import { IReqFlightSearch } from "../server/flights/SearchFlightListEndpoint"
type arrObj = {
  origin?: string
  destination?: string
  flightDate?: string
}

export const RoundWayFormatter = (query: IReqFlightSearch) => {
  let emptyArr: arrObj[] = []
  const tripsArr = query?.trips?.split(",") || []
  const tripsArrLen = tripsArr?.length || 0

  for (let i = 0; i < tripsArrLen; i += 3) {
    const origin = tripsArr[i]
    const destination = tripsArr[i + 1]
    const flightDate = tripsArr[i + 2]

    const flight = {
      origin: origin,
      destination: destination,
      flightDate: flightDate,
    }

    emptyArr.push(flight)
  }

  const formattedQuery: any = {
    OriginDestinationInformation: [],
    PassengerTypeQuantity: [
      {
        Code: "ADT",
        Quantity: Number(query.adults || 1) || 1,
      },
    ],
  }

  emptyArr.forEach((item, index) => {
    const formattedObj = {
      RPH: String(index + 1),
      DepartureDateTime: item.flightDate
        ? format(new Date(item.flightDate), "YYYY-MM-DDTHH:mm:ss")
        : "no date formate",
      OriginLocation: {
        LocationCode: item.origin,
      },
      DestinationLocation: {
        LocationCode: item.destination,
      },
      TPA_Extensions: {
        CabinPref: {
          Cabin:
            (query.class === "Economy" && "Y") ||
            (query.class === "First Class" && "F") ||
            (query.class === "Premium Economy" && "S") ||
            (query.class === "Business Class" && "C"),
          PreferLevel: "Preferred",
        },
      },
    }
    formattedQuery.OriginDestinationInformation.push(formattedObj)
  })

  if (Number(query.child || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "C11",
      Quantity: Number(query.child),
    })
  }

  if (Number(query.infant || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "INY",
      Quantity: Number(query.infant),
    })
  }
  return formattedQuery
}
