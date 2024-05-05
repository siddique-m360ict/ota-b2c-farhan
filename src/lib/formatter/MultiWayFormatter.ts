import { format } from "date-fns"
import { IReqFlightSearch } from "../server/flights/SearchFlightListEndpoint"
type arrObj = {
  origin?: string
  destination?: string
  flightDate?: string
}

export const MultiWayFormatter = (query: IReqFlightSearch) => {
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
        ? format(new Date(item.flightDate), "yyyy-MM-dd'T'HH:mm:ss")
        : "no date formate",
      OriginLocation: {
        LocationCode: item.origin,
      },
      DestinationLocation: {
        LocationCode: item.destination,
      },
      TPA_Extensions: {
        CabinPref: {
          Cabin: query.class?.toUpperCase(),
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
  if (Number(query.kids || 0) > 0) {
    formattedQuery.PassengerTypeQuantity.push({
      Code: "C05",
      Quantity: Number(query.kids),
    })
  }
  return formattedQuery
}
