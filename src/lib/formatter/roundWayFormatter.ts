import { format } from "date-fns"
import { IReqFlightSearch } from "../server/flights/SearchFlightListEndpoint"

export const RoundWayFormatter = (query: IReqFlightSearch) => {
  const formattedQuery = {
    OriginDestinationInformation: [
      {
        RPH: "1",
        DepartureDateTime: query.departuredate
          ? format(new Date(query.departuredate), "yyyy-MM-dd'T'HH:mm:ss")
          : "no date formate",
        OriginLocation: {
          LocationCode: query.origin,
        },
        DestinationLocation: {
          LocationCode: query.destination,
        },
        TPA_Extensions: {
          CabinPref: {
            Cabin: query.class?.toUpperCase(),
            PreferLevel: "Preferred",
          },
        },
      },

      {
        RPH: "2",
        DepartureDateTime: query.returndate
          ? format(new Date(query.returndate), "yyyy-MM-dd'T'HH:mm:ss")
          : "no date formate",
        OriginLocation: {
          LocationCode: query.destination,
        },
        DestinationLocation: {
          LocationCode: query.origin,
        },
        TPA_Extensions: {
          CabinPref: {
            Cabin: query.class?.toUpperCase(),
            PreferLevel: "Preferred",
          },
        },
      },
    ],
    PassengerTypeQuantity: [
      {
        Code: "ADT",
        Quantity: Number(query.adults || 1) || 1,
      },
    ],
  }

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
