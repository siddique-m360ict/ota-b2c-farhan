import { format } from "date-fns"
import { IReqFlightSearch } from "../server/flights/SearchFlightListEndpoint"

export const MultiWayFormatter = (query: IReqFlightSearch) => {
  const formattedQuery = {
    OriginDestinationInformation: [
      {
        RPH: "1",
        DepartureDateTime: query.departuredate
          ? format(new Date(query.departuredate), "YYYY-MM-DDTHH:mm:ss")
          : "no date formate",
        OriginLocation: {
          LocationCode: query.origin,
        },
        DestinationLocation: {
          LocationCode: query.destination,
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
      },

      {
        RPH: "2",
        DepartureDateTime: query.returndate
          ? format(new Date(query.returndate), "YYYY-MM-DDTHH:mm:ss")
          : "no date formate",
        OriginLocation: {
          LocationCode: query.destination,
        },
        DestinationLocation: {
          LocationCode: query.origin,
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

  return formattedQuery
}
